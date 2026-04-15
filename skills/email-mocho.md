# Email El Mocho

Send an email to El Mocho (Gerardo Medina) via Gmail using Playwright.

## Contact
- **To**: gerardo.medina.jasso@gmail.com
- **From**: oscarmexias@gmail.com (must be logged in Chrome)

## Trigger
Invoked when the user says "manda correo al mocho", "email mocho", or explicitly calls this skill.

## Protocol

When invoked:

1. **Ask the user** for subject and message body if not already provided.
   - If the user gave a message inline (e.g. "dile que llegamos a las 8"), use that as the body.
   - If no subject was given, infer one from the message (keep it short, natural).

2. **Open Gmail** via Playwright:
   ```
   mcp__playwright__browser_navigate → "https://mail.google.com"
   ```

3. **Check login state**: If not logged in as oscarmexias@gmail.com, stop and tell the user to log in first.

4. **Compose new email**:
   - Click the "Compose" button (aria-label="Compose" or the pencil/write button)
   - Wait for the compose window to open

5. **Fill To field**:
   - Click the To field
   - Type: `gerardo.medina.jasso@gmail.com`
   - Press Tab to confirm

6. **Fill Subject**:
   - Click the Subject field
   - Type the subject

7. **Fill Body**:
   - Click the message body area
   - Type the message

8. **Send**:
   - Click the Send button (aria-label="Send")
   - Confirm it was sent

9. **Report back** to Oscar: "✓ Correo enviado a El Mocho: [subject]"

## Example invocations

```
/user:email-mocho
→ Claude asks for subject and message, then sends

/user:email-mocho dile que mañana no puedo ir
→ Claude infers subject "Mañana", sends with that message

/user:email-mocho asunto: Reunión — mensaje: ¿Puedes el viernes a las 7?
→ Claude uses provided subject and message directly
```

## Error handling

- **Not logged in**: "Necesitas estar logueado como oscarmexias@gmail.com en Chrome. Ábrelo y luego llámame."
- **Compose window doesn't open**: Retry once, then report the error.
- **Send fails**: Take a screenshot and report what happened.
