import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "../env";
import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()),
        }),
      },
    },
    async (request) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      } = request.body;

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new ClientError("Invalid trip start date.");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new ClientError("Invalid trip end date.");
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data: [
                {
                  name: owner_name,
                  email: owner_email,
                  is_owner: true,
                  is_confirmed: true,
                },
                ...emails_to_invite.map((email) => {
                  return { email };
                }),
              ],
            },
          },
        },
      });

      const formattedStartDate = dayjs(starts_at).format("LL");
      const formattedEndDate = dayjs(ends_at).format("LL");

      const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;

      const mail = await getMailClient();

      const message = await mail.sendMail({
        from: {
          name: "Plann.er team",
          address: "hello@plann.er",
        },
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: `Confirm your trip to ${destination} on ${formattedStartDate}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
            <p>
              You have requested to create a trip to <strong>${destination}</strong> for
              the dates of <strong>${formattedStartDate}</strong> to <strong>${formattedEndDate}</strong>
            </p>
            <p></p>
            <p>To confirm your trip, click on the link below:</p>
            <p></p>
            <p>
              <a href="${confirmationLink}">Confirm Trip</a>
            </p>
            <p></p>
            <p>If you do not know what this email is about, just ignore it.</p>
          </div>

        `.trim(),
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return { tripId: trip.id };
    }
  );
}
