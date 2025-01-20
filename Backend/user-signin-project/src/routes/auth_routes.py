from flask import Blueprint, request, jsonify
from src.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User(email=email, password=password)
    user.save()  # Assuming a save method exists in the User model
    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.find_by_email(email)  # Assuming a method to find user by email
    if user and user.check_password(password):  # Assuming a method to check password
        return jsonify({'message': 'Sign in successful'}), 200
    return jsonify({'error': 'Invalid email or password'}), 401