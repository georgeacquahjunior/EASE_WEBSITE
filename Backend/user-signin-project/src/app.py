from flask import Flask
from routes.auth_routes import auth_bp

app = Flask(__name__)

# Configuration settings
app.config['SECRET_KEY'] = 'your_secret_key_here'

# Register blueprints
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True)