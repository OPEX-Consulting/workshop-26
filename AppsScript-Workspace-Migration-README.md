# Move the Registration Email Sender to the Correct Google Workspace Account

## Why this is necessary

The confirmation email is sent by the Google account that owns and deploys the Apps Script web app. `EMAIL_FROM_NAME` changes the display name only; it does not change the actual sender email address. `EMAIL_REPLY_TO` only controls where replies go.

Create and deploy the replacement Apps Script while signed in to the Google Workspace account whose real email address must appear in the **From** field.

## Before you begin

You need:

- Access to the correct Google Workspace sender account.
- Editor access to the existing registration Google Sheet from that account.
- The existing Sheet's ID. In its URL, copy the text between `/d/` and `/edit`.
- The current Apps Script endpoint left live until the replacement has been tested.

The `Responses` sheet tab must retain its current name.

## Create the new Apps Script project

1. Sign out of other Google accounts, or open an Incognito window.
2. Sign in only as the valid Workspace sender account.
3. Open [script.google.com](https://script.google.com) and select **New project**.
4. Rename the project, for example `OPEX Workshop Registration Sender`.
5. Replace the default `Code.gs` content with the complete contents of `AppsScript-Code.gs` from this repository.
6. Save the project.

This is deliberately a standalone script, not a script bound to the Sheet. It allows the proper Workspace account to send mail while writing registrations into the existing Sheet.

## Add Script Properties

In the Apps Script project, select **Project Settings** from the left sidebar. Under **Script Properties**, add these values:

| Property | Value |
| --- | --- |
| `SPREADSHEET_ID` | The existing registration Sheet ID |
| `EMAIL_FROM_NAME` | `OPEX Consulting` or your approved display name |
| `EMAIL_REPLY_TO` | The events/helpdesk email address that should receive replies |
| `EMAIL_CC` | Optional internal logistics address; leave blank if not required |

Do not put these values in the React app, Vercel environment variables, or browser code.

## Authorize and test access

1. From the function dropdown, select `setup`.
2. Click **Run**.
3. Complete the Google permission prompts for Google Sheets and sending email.
4. Confirm the execution completes successfully.

If it reports that the Sheet cannot be opened, share the existing registration Sheet with the Workspace sender account as an **Editor**, then run `setup` again.

## Deploy the replacement web app

1. Click **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to **Me**. Confirm that “Me” is the correct Workspace sender account.
4. Set **Who has access** to **Anyone** so the public registration site can submit registrations.
5. Click **Deploy**, approve any remaining permissions, and copy the URL ending in `/exec`.

The sender shown to participants will be the account selected by **Execute as**, not `EMAIL_FROM_NAME`.

## Point Vercel to the new endpoint

1. In Vercel, open the workshop project.
2. Go to **Settings → Environment Variables**.
3. Edit `REGISTRATION_SHEET_ENDPOINT` for the **Production** environment.
4. Replace its value with the new `/exec` URL.
5. Save the variable and create a new production deployment.

Vite reads `VITE_` variables at build time, so a new deployment is required after changing the endpoint.

## Verify before cutover

Submit one test registration from the deployed site and confirm all of the following:

- A row appears in the existing `Responses` sheet.
- The confirmation email is delivered.
- The email's actual **From** address is the intended Workspace sender address.
- The reply address and any logistics CC recipient are correct.
- The session time in the email is correct.

Only after this succeeds should you disable or delete the old Apps Script deployment.

## Troubleshooting

| Problem | Resolution |
| --- | --- |
| Email still has the old sender | The web app was deployed by the wrong Google account. Recreate or redeploy it while signed in to the intended Workspace sender account, with **Execute as: Me**. |
| `SPREADSHEET_ID is not configured` | Add the exact Sheet ID in Script Properties. |
| Sheet cannot be opened | Grant the Workspace sender account Editor access to the existing Sheet. |
| Registration works but no email arrives | Check Apps Script **Executions** for mail errors and the recipient's spam/quarantine folder. |
| Live site still uses the old endpoint | Confirm the Vercel Production value of `REGISTRATION_SHEET_ENDPOINT`, then create a new production deployment. |
