import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "../env";
import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { email } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new ClientError("Trip not found.");
      }

      const participant = await prisma.participant.create({
        data: {
          email,
          trip_id: tripId,
        },
      });

      const formattedStartDate = dayjs(trip.starts_at).format("LL");
      const formattedEndDate = dayjs(trip.ends_at).format("LL");

      const mail = await getMailClient();

      const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

      const message = await mail.sendMail({
        from: {
          name: "Plann.er team",
          address: "hello@plann.er",
        },
        to: participant.email,
        subject: `Confirm your presence on the trip to ${trip.destination} on ${formattedStartDate}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
            <p>
              You have been invited to participate in a trip to <strong>${trip.destination}</strong> for
              the dates of <strong>${formattedStartDate}</strong> to <strong>${formattedEndDate}</strong>
            </p>
            <p></p>
            <p>To confirm your presence on the trip, click on the link below:</p>
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

      return { participantId: participant.id };
    }
  );
}
