/**
 * OPEX Summit 2026: post-conference assessment endpoint.
 * Appends each submission from summits.ng/assessment to the
 * "OPEX End of Manual Participants 2026" spreadsheet. Sends no email.
 *   Attendees      -> "Follow Up" tab
 *   Non-attendees  -> "Non-Attendee Follow Up" tab (created if missing)
 *
 * v2 update: paste this whole file over the old one, Save, then
 * Deploy > Manage deployments > (pencil) Edit > Version: New version > Deploy.
 * The /exec URL stays the same.
 *
 * Deploy: script.google.com > New project > paste this file > Deploy > New deployment
 * > Web app, Execute as: Me, Who has access: Anyone. Put the /exec URL in
 * src/app/assessment/config.ts (FOLLOW_UP_ENDPOINT).
 */
const SPREADSHEET_ID = "1iph7EdXOIgAS-IMVJlBV9CpR0Z0Et8wtDypgZl9TOQM";
const ALLOWED_TABS = ["Follow Up", "Non-Attendee Follow Up"];
const VERSION = 2;

function doGet() {
  return json({ ok: true, service: "OPEX follow-up assessment", version: VERSION });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const columns = data.columns || [];
    const row = data.row || {};
    if (!row["Email"]) return json({ ok: false, error: "Missing email" });

    const tabName = data.tab || "Follow Up";
    if (ALLOWED_TABS.indexOf(tabName) === -1) return json({ ok: false, error: "Unknown tab" });
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = book.getSheetByName(tabName) || book.insertSheet(tabName);

    // Header row: written on first use, and extended if new columns appear.
    const width = sheet.getLastColumn();
    let headers = width ? sheet.getRange(1, 1, 1, width).getValues()[0].filter(String) : [];
    if (!headers.length) headers = ["Submitted At"];
    columns.forEach(function (c) { if (headers.indexOf(c) === -1) headers.push(c); });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);

    const values = headers.map(function (h) {
      return h === "Submitted At" ? new Date() : String(row[h] == null ? "" : row[h]);
    });
    sheet.appendRow(values);
    return json({ ok: true, tab: tabName, version: VERSION });
  } catch (error) {
    return json({ ok: false, error: String(error && error.message || error) });
  } finally {
    lock.releaseLock();
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
