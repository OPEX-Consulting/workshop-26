# OPEX Executive Workshop Registration

## Local development

```bash
npm ci
npm run dev
```

Create `.env.local` with the Google Apps Script endpoint:

```env
VITE_REGISTRATION_SHEET_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Vercel deployment

Import this repository into Vercel. The included `vercel.json` configures the Vite build.

Add this production environment variable in **Project Settings → Environment Variables**:

```text
VITE_REGISTRATION_SHEET_ENDPOINT
```

Set it to the deployed Google Apps Script `/exec` URL for the required environments. Redeploy after changing it because Vite embeds `VITE_` variables during the build.

## Validation

```bash
npm run lint
npm run build
```

The Google Apps Script source is in `AppsScript-Code.gs`.
