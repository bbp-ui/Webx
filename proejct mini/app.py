import qrcode
import os
import random
import pyotp
from flask import Flask, render_template, request, redirect, flash, url_for, session, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Configure Flask-Mail
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "bhagyeshstudy404@gmail.com"  # Replace with your email
app.config["MAIL_PASSWORD"] = "zwbk jykh qzwp eseo"  # Replace with your app password
app.config["MAIL_DEFAULT_SENDER"] = "your-email@gmail.com"

mail = Mail(app)

# Ensure QR code directory exists
if not os.path.exists("static/qrcodes"):
    os.makedirs("static/qrcodes")

# Event list
events = {
    "Tech Conference 2025": {"description": "A conference on emerging technologies.", "slots": 5},
    "AI Workshop": {"description": "Hands-on session on AI and Machine Learning.", "slots": 3},
    "Web Dev Bootcamp": {"description": "A crash course on web development.", "slots": 4}
}

# Prize list
prizes = ["10% Discount Coupon", "Free E-Book", "Priority Seating", "Event Badge", "Thank You Gift"]

participants = []  # Store participants

# Store OTPs temporarily
otp_store = {}

feedback_list = []  # Store feedback

# Hardcoded password for simplicity
ADMIN_PASSWORD = "your_secure_password"

@app.route('/')
def index():
    return render_template("index.html", events=events)

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get("name")
    email = request.form.get("email")
    event = request.form.get("event")

    if name and email and event:
        if events[event]["slots"] > 0:
            # Store participant details in session
            session['name'] = name
            session['event'] = event

            # Generate OTP
            otp = generate_otp(email)
            otp_store[email] = otp

            # Send OTP email
            send_otp_email(name, email, otp)

            flash("An OTP has been sent to your email. Please verify to complete registration.", "info")
            return redirect(url_for('verify_otp', email=email))
        else:
            flash("Sorry, no more slots available for this event!", "danger")
    else:
        flash("All fields are required!", "danger")

    return redirect('/')

def generate_otp(email):
    """Generates a time-based OTP for the given email"""
    totp = pyotp.TOTP(pyotp.random_base32())
    return totp.now()

def send_otp_email(name, email, otp):
    """Sends an OTP email"""
    subject = "Your OTP for Event Registration"
    body = f"""
    Hello {name},

    Your OTP for completing the registration is: {otp}

    Please enter this OTP to verify your registration.

    Best Regards,
    Event Team
    """
    msg = Message(subject, recipients=[email], body=body)
    mail.send(msg)

@app.route('/verify_otp', methods=['GET', 'POST'])
def verify_otp():
    email = request.args.get("email")
    if request.method == 'POST':
        entered_otp = request.form.get("otp")
        if email in otp_store and otp_store[email] == entered_otp:
            # OTP is correct, complete registration
            flash("OTP verified! Registration complete.", "success")
            del otp_store[email]  # Remove OTP after successful verification
            
            # Retrieve participant details from session
            name = session.get('name')
            event = session.get('event')
            
            # Add participant to the list
            participants.append({"name": name, "email": email, "event": event})
            
            # Clear session data
            session.pop('name', None)
            session.pop('event', None)
            
            # Redirect to the next page, e.g., a confirmation page
            return redirect(url_for('confirmation', name=name, email=email, event=event))
        else:
            flash("Invalid OTP. Please try again.", "danger")

    return render_template("verify_otp.html", email=email)

@app.route('/confirmation')
def confirmation():
    name = request.args.get("name")
    email = request.args.get("email")
    event = request.args.get("event")
    prize = request.args.get("prize")

    # Send confirmation email with QR code
    send_confirmation_email(name, email, event)

    return render_template("confirmation.html", name=name, email=email, event=event, prize=prize)

@app.route('/participants')
def view_participants():
    return render_template("participants.html", participants=participants, events=events)

@app.route('/leaderboard')
def leaderboard():
    # Count registrations for each event
    event_counts = {event: 0 for event in events}
    for participant in participants:
        event_counts[participant["event"]] += 1

    # Identify the most registered event
    most_registered_event = max(event_counts, key=event_counts.get) if event_counts else None

    return render_template("leaderboard.html",
                           participants=participants,
                           event_counts=event_counts,
                           most_registered_event=most_registered_event,
                           events=events)

def generate_qr_code(data, filename):
    """Generates a QR code for the given data and saves it as an image file."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(os.path.join("static/qrcodes", filename))

def send_confirmation_email(name, email, event):
    """Sends a confirmation email with a QR code."""
    # Generate QR code
    qr_filename = f"{email}_qrcode.png"
    generate_qr_code(f"Event: {event}, Name: {name}", qr_filename)

    subject = "Your Event Registration Confirmation"
    body = f"""
    Hello {name},

    Thank you for registering for {event}. Please find your QR code attached.

    Best Regards,
    Event Team
    """
    msg = Message(subject, recipients=[email], body=body)
    with app.open_resource(os.path.join("static/qrcodes", qr_filename)) as fp:
        msg.attach(qr_filename, "image/png", fp.read())
    mail.send(msg)

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        event = request.form.get('event')
        name = request.form.get('name')
        feedback_text = request.form.get('feedback')

        # Store feedback
        feedback_list.append({'event': event, 'name': name, 'feedback': feedback_text})

        flash("Thank you for your feedback!", "success")
        return redirect(url_for('index'))

    return render_template('feedback.html', events=events)

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/api/events')
def api_events():
    # Convert events to a list of dictionaries
    event_list = [
        {"title": name, "start": "2025-01-01"}  # Example date, replace with actual event dates
        for name in events.keys()
    ]
    return jsonify(event_list)

if __name__ == '__main__':
    app.run(debug=True)