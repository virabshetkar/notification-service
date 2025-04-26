# Notification Service

## Requirements

1. Node (v22)
2. Docker

## How to run

### Docker Compose


Use the following command to run the service
> Note: Make sure the ports 1080 and 3000 are free.

```cmd
docker compose up
```

Docker compose starts a fake SMTP Server (Mailcatcher) and emails sent can be viewed on `localhost:1080`

### Node

#### Prerequisites

The following environment variables are needed

1. PORT (Default 3000): Port of the service
1. MAIL_HOST: Host name of the mail server
1. MAIL_PORT: Port of the mail server
1. MAIL_USER: Username of the mail client
1. MAIL_PASS: Password of the mail client
1. MAIL_SECURE (Optional): For TLS

After configuring the environment variables you can run the following command:

```cmd
npm start
```

## Notification Service Endpoints

1. `POST` /api/notifications/send-email: To send an email request

    Requires a Notification request object:

    ```json
    {
        "user": {
            "name": string, // Receiver's Name
            "email": string  // Receiver's Email
        },
        "emailType": string, // Type of email to be sent ["registration", "payment-success", "payment-failure"]
        "templateData": {
            ... // Data for the email template Ex: { "name": "John Doe" }
        }
    }
    ```