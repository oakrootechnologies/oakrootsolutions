import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactPayload {
  name: string;
  email: string;
  contact: string;
  preferredTime: string;
  website: string;
  query: string;
  aboutProduct: string;
}

// ─── SMTP Transporter ────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Internal Operations Alert Email ─────────────────────────────────────────
function buildInternalAlert(data: ContactPayload): string {
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — Operations Desk</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;overflow:hidden;border:1px solid #222;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;padding:28px 40px;border-bottom:1px solid #222;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#888;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Oakroot Solutions — Ops Desk</p>
                    <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">🔔 New Client Inquiry Received</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#ff3b3b;color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:100px;">ACTION REQUIRED</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td style="padding:20px 40px 0;background:#111;">
              <p style="margin:0;color:#555;font-size:12px;">Submitted on <strong style="color:#888;">${submittedAt} IST</strong></p>
            </td>
          </tr>

          <!-- Lead Details -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td colspan="2" style="padding-bottom:16px;border-bottom:1px solid #222;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Client Name</p>
                    <p style="margin:0;color:#fff;font-size:18px;font-weight:600;">${data.name}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #1e1e1e;width:50%;vertical-align:top;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Work Email</p>
                    <a href="mailto:${data.email}" style="color:#4e8cff;font-size:14px;text-decoration:none;">${data.email}</a>
                  </td>
                  <td style="padding:16px 0;border-bottom:1px solid #1e1e1e;vertical-align:top;padding-left:20px;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Contact Number</p>
                    <a href="tel:${data.contact}" style="color:#4e8cff;font-size:14px;text-decoration:none;">${data.contact}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #1e1e1e;width:50%;vertical-align:top;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Service Domain</p>
                    <span style="display:inline-block;background:#1e2a1e;color:#6ddb7a;font-size:13px;font-weight:600;padding:4px 12px;border-radius:100px;border:1px solid #2e4a2e;">${data.query || 'Not specified'}</span>
                  </td>
                  <td style="padding:16px 0;border-bottom:1px solid #1e1e1e;vertical-align:top;padding-left:20px;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Preferred Reach Time</p>
                    <p style="margin:0;color:#ccc;font-size:14px;">${data.preferredTime || 'Not specified'}</p>
                  </td>
                </tr>

                ${data.website ? `
                <tr>
                  <td colspan="2" style="padding:16px 0;border-bottom:1px solid #1e1e1e;">
                    <p style="margin:0 0 4px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Existing Website</p>
                    <a href="${data.website}" target="_blank" style="color:#4e8cff;font-size:14px;text-decoration:none;">${data.website}</a>
                  </td>
                </tr>` : ''}

                <tr>
                  <td colspan="2" style="padding:20px 0 0;">
                    <p style="margin:0 0 8px;color:#555;font-size:11px;letter-spacing:2px;text-transform:uppercase;">About Their Business</p>
                    <div style="background:#161616;border-left:3px solid #333;border-radius:0 8px 8px 0;padding:16px 20px;">
                      <p style="margin:0;color:#bbb;font-size:14px;line-height:1.7;">${data.aboutProduct}</p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${data.email}?subject=Re: Your Inquiry to Oakroot Solutions" style="display:inline-block;background:#fff;color:#000;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;padding:14px 28px;border-radius:8px;text-decoration:none;">Reply to Client</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1a1a1a;background:#0d0d0d;">
              <p style="margin:0;color:#444;font-size:11px;">This is an automated internal notification generated by the Oakroot Solutions website. Do not reply directly to this email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Client Auto-Responder Email ──────────────────────────────────────────────
function buildClientAutoResponder(name: string, service: string): string {
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've Received Your Inquiry — Oakroot Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">

          <!-- Hero Header -->
          <tr>
            <td style="background:#0a0a0a;padding:48px 48px 40px;">
              <p style="margin:0 0 32px;color:#555;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Oakroot Solutions</p>
              <h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;letter-spacing:-1px;line-height:1.2;">Your inquiry is<br/>in the right hands.</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <p style="margin:0 0 20px;color:#1a1a1a;font-size:15px;line-height:1.7;">Dear ${firstName},</p>

              <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.7;">
                Thank you for reaching out to Oakroot Solutions. We've received your inquiry regarding <strong style="color:#1a1a1a;">${service || 'our services'}</strong> and our team has been notified immediately.
              </p>

              <p style="margin:0 0 32px;color:#444;font-size:15px;line-height:1.7;">
                A dedicated strategist from our team will review your submission and reach out within <strong style="color:#1a1a1a;">1 business day</strong> to discuss your project in detail.
              </p>

              <!-- What happens next -->
              <div style="background:#f8f8f6;border-radius:12px;padding:28px 32px;margin-bottom:32px;">
                <p style="margin:0 0 20px;color:#1a1a1a;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">What Happens Next</p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:16px;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                            <span style="display:inline-block;background:#0a0a0a;color:#fff;width:22px;height:22px;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</span>
                          </td>
                          <td>
                            <p style="margin:0;color:#1a1a1a;font-size:14px;font-weight:600;">Brief Review</p>
                            <p style="margin:4px 0 0;color:#777;font-size:13px;">Our team analyses your submission to prepare tailored questions.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:16px;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                            <span style="display:inline-block;background:#0a0a0a;color:#fff;width:22px;height:22px;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</span>
                          </td>
                          <td>
                            <p style="margin:0;color:#1a1a1a;font-size:14px;font-weight:600;">Discovery Call</p>
                            <p style="margin:4px 0 0;color:#777;font-size:13px;">A 30-minute strategy session to understand your goals and timeline.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                            <span style="display:inline-block;background:#0a0a0a;color:#fff;width:22px;height:22px;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</span>
                          </td>
                          <td>
                            <p style="margin:0;color:#1a1a1a;font-size:14px;font-weight:600;">Tailored Proposal</p>
                            <p style="margin:4px 0 0;color:#777;font-size:13px;">A custom roadmap, scope, and investment plan delivered to you.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin:0 0 8px;color:#444;font-size:15px;line-height:1.7;">
                If your matter is time-sensitive, please reach us directly at:
              </p>
              <p style="margin:0 0 32px;">
                <a href="mailto:hello@oakrootsolutions.com" style="color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:underline;text-underline-offset:4px;">hello@oakrootsolutions.com</a>
                &nbsp;·&nbsp;
                <a href="tel:+919202212290" style="color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:underline;text-underline-offset:4px;">+91 92022 12290</a>
              </p>

              <p style="margin:0;color:#444;font-size:15px;line-height:1.7;">
                We look forward to the possibility of working with you.
              </p>
              <p style="margin:16px 0 0;color:#1a1a1a;font-size:15px;font-weight:600;">— The Oakroot Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px;background:#f8f8f6;border-top:1px solid #ebebeb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#aaa;font-size:12px;line-height:1.6;">
                      Oakroot Solutions · DAVV Incubation Centre, IT Park, Indore 452020, India<br/>
                      <a href="https://oakrootsolutions.com" style="color:#aaa;text-decoration:underline;">oakrootsolutions.com</a>
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;color:#ccc;font-size:11px;">You're receiving this because you contacted us.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── API Handler ──────────────────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data: ContactPayload = req.body;

  if (!data.name || !data.email || !data.contact || !data.aboutProduct) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[Contact API] SMTP environment variables not configured.');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const transporter = createTransporter();

    // ── 1. Internal Operations Alert ──────────────────────────────────────────
    await transporter.sendMail({
      from: `"Oakroot Website" <${process.env.SMTP_USER}>`,
      to: process.env.OPS_ALERT_EMAIL || 'hello@oakrootsolutions.com',
      subject: `🔔 New Lead: ${data.name} — ${data.query || 'General Inquiry'}`,
      html: buildInternalAlert(data),
    });

    // ── 2. Client Auto-Responder ───────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Oakroot Solutions" <${process.env.SMTP_USER}>`,
      to: data.email,
      replyTo: 'hello@oakrootsolutions.com',
      subject: `We've received your inquiry, ${data.name.split(' ')[0]}.`,
      html: buildClientAutoResponder(data.name, data.query),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Contact API] Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send emails. Please try again.' });
  }
}
