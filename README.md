<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run">How to run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

# NLW Journey

## 🚀 Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org/en/) - v22.4.0
- [Npm](https://www.npmjs.com/) - 10.8.1
- [TypeScript](https://www.typescriptlang.org/) - ^5.8.2
- [Prisma](https://www.prisma.io/docs) - ^6.5.0
- [Fastify](https://www.fastify.io/) - ^5.2.1
- [Zod](https://zod.dev/) - ^3.24.2
- [Nodemailer](https://www.nodemailer.com/) - ^6.10.0

## 💻 Project

NLW event on the [Rocketseat](https://www.rocketseat.com.br/) platform.

<h4>
	🚧  Under construction...  🚧
</h4>

- [Front-end - Web](https://github.com/leticea/nlw-journey-react)

<p align="center">
  <img alt="" src=".github/image.png">
</p>

<p align="center">
  <img alt="" src=".github/image2.png">
</p>

## ⚙️ How to run

- Clone the project.
- Go to the project folder and run 'npm install' (use 'yarn install' if that's your configuration).
- npm run dev to run the project on the indicated port.
- npx prisma studio (to view the database).

## 👩🏿‍💻 Trips Routes

- **`POST http://localhost:3333/trips`**: Create trip

Send:

```
{
  "destination": "Salvador",
  "starts_at": "2025-04-15 18:00:00",
  "ends_at": "2025-04-29 18:00:00",
  "owner_name": "Letícia Mangueira",
  "owner_email": "leticia.mangueira@acme.com",
  "emails_to_invite": [
    "diego@rocketseat.com",
    "johndoe@acme.com"
  ]
}
```

Returns:

```
{
  "tripId": "9626e02a-9458-4c82-b854-9918d2c366c2"
}
```

- **`GET http://localhost:3333/trips/:tripId/confirm`**: <b>Confirm trip</b>

- **`GET http://localhost:3333/participants/:participantId/confirm`**: <b>Confirm participant</b>

## 👩🏿‍💻 Activities Routes

- **`POST http://localhost:3333/trips/:tripId/activities`**: <b>Create activity</b>

Send:

```
{
  "title": "Lunch",
  "occurs_at": "2025-04-18 09:00:00",
}
```

Returns:

```
{
  "activityId": "432ef451-db66-417f-82dd-306fb67423b8"
}
```

- **`GET http://localhost:3333/trips/:tripId/activities`**: <b>Get activities</b>

Returns:

```
{
  "activities": [
    {
      "date": "2025-04-15T21:00:00.000Z",
      "activities": []
    },
    {
      "date": "2025-04-16T21:00:00.000Z",
      "activities": []
    },
    {
      "date": "2025-04-17T21:00:00.000Z",
      "activities": []
    },
    {
      "date": "2025-04-18T21:00:00.000Z",
      "activities": [
        {
          "id": "432ef451-db66-417f-82dd-306fb67423b8",
          "title": "Lunch",
          "occurs_at": "2025-04-18T12:00:00.000Z",
          "trip_id": "9626e02a-9458-4c82-b854-9918d2c366c2"
        }
      ]
    },
  ]
}
```

## 👩🏿‍💻 Links Routes

- **`POST http://localhost:3333/trips/:tripId/links`**: <b>Create link</b>

Send:

```
{
  "title": "AirBnB Booking",
  "url": "https://airbnb.com/booking-journey"
}
```

Returns:

```
{
  "linkId": "251f8048-4287-45b0-b258-a320de4352df"
}
```

- **`GET http://localhost:3333/trips/:tripId/links`**: <b>Get links</b>

Returns:

```
{
  "links":  [
	  {
        "id": "251f8048-4287-45b0-b258-a320de4352df",
        "title": "AirBnB Booking",
        "url": "https://airbnb.com/booking-journey",
        "trip_id": "9626e02a-9458-4c82-b854-9918d2c366c2"
	  }
	]
}
```

## 🤔 How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

After your pull request is merged, you can delete your branch.

## 📝 License

This project is under the MIT license.
