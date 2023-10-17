# from flask import Flask, render_template, request, jsonify
# from flask_mail import Mail, Message

# app = Flask(__name__)

# # Configure Flask Mail
# app.config['MAIL_SERVER'] = 'smtp.example.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USERNAME'] = 'afolabisaheedat1@gmail.com'
# app.config['MAIL_PASSWORD'] = 'your_email_password'
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False

# mail = Mail(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/submit_form', methods=['POST'])
# def submit_form():
#     name = request.form['name']
#     sender_email = request.form['email']
#     message = request.form['message']

#     if not name or not sender_email or not message:
#         return jsonify({'error': 'All fields are required'}), 400

#     if '@' not in sender_email or '.' not in sender_email:
#         return jsonify({'error': 'Invalid email format'}), 400

#     send_email(name, sender_email, message)

#     return jsonify({'message': 'Form submitted successfully'}), 200

# def send_email(name, sender_email, message):
#     recipient_email = 'afolabisaheedat1@gmail.com'

#     msg = Message('New Form Submission', sender=sender_email, recipients=[recipient_email])
#     msg.body = f'Name: {name}\nEmail: {sender_email}\nMessage: {message}'
#     mail.send(msg)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, render_template, request
import smtplib

app = Flask(__name__)

subscribers = []

@app.route('/contact', methods = ["POST"])
def form():
    name = request.form.get(name)
    sender_email = request.form['email']
    message = request.form['message']

    if not name or not sender_email or not message:
        error_statement = "All Form Fields Required..."
        return render_template("#form",
                error_statement= error_statement,
                name = name,
                sender_email = sender_email)
    subscribers.appemd(f'f{name} {message} | {sender_email}')    
    