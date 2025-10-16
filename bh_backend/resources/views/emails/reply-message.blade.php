<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #667eea; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .original-message { background: white; padding: 15px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Réponse à votre message</h1>
        </div>
        
        <div class="content">
            <p>Bonjour {{ $contactMessage->name }},</p>
            
            <p>Merci de nous avoir contactés. Voici notre réponse à votre message :</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
                {!! nl2br(e($replyText)) !!}
            </div>
            
            <div class="original-message">
                <strong>Votre message original :</strong>
                <p><strong>Sujet :</strong> {{ $contactMessage->subject }}</p>
                <p>{{ $contactMessage->message }}</p>
            </div>
            
            <p>Si vous avez d'autres questions, n'hésitez pas à nous recontacter.</p>
            
            <p>Cordialement,<br>L'équipe Blog Histoire</p>
        </div>
        
        <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</p>
        </div>
    </div>
</body>
</html>
