from flask import Flask, request, jsonify
import pymysql.cursors
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://127.0.0.1:5500'])

db_host = "localhost"
db_user = "root"
db_password = "mysqlpassword"
db_name = "loginvalidation"

def connect_to_DB():
    connection = pymysql.connect(
        host=db_host,
        user=db_user,
        database=db_name,
        password=db_password,
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection

@app.route('/register/', methods=['POST'])
def register_user():
    data = request.json
    connection = connect_to_DB()

    try:
        with connection.cursor() as cursor:
            sql = """INSERT INTO User_Credentials(
            first_name, last_name, email_address, phone_number, password)
            VALUES ('sjkdf', 'skjdfk', 'sdfsdf@gmail.com', '98349314', 'sdfsfsdfsdf')"""

            cursor.execute(sql, (data['first_name'], data['last_name'], data['email_address'], data['phone_number'], data['password']))
            connection.commit()

            return jsonify({'success':True, 'message':'User Registered SuccessFully'})
    
    except Exception as e:
        return jsonify({'success':False, 'message':str(e)})

    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)

# import mysql.connector
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pymysql.cursors


# app = Flask(__name__)
# CORS(app, origins=['http://127.0.0.1:5500'])

# @app.route('/register/', methods=['POST'])
# def register_user():
#     data = request.json  # Assuming the client sends JSON data
#     first_name = data['first_name']
#     last_name = data['last_name']
#     email_address = data['email_address']
#     phone_number = data['phone_number']
#     password = data['password']

#     try:
#         # Establishing the connection
#         conn = mysql.connector.connect(
#             user='root', password='mysqlpassword', host='127.0.0.1', database='loginvalidation')

#         # Creating a cursor object using the cursor() method
#         cursor = conn.cursor()

#         # Preparing SQL query to INSERT a record into the database
#         sql = """INSERT INTO User_Credentials(
#             first_name, last_name, email_address, phone_number, password)
#             VALUES ('sjkdf', 'skjdfk', 'sdfsdf@gmail.com', '98349314', 'sdfsfsdfsdf')"""

#         # Executing the SQL command
#         cursor.execute(sql, (first_name, last_name, email_address, phone_number, password))

#         # Committing changes in the database
#         conn.commit()

#         # Closing the connection
#         conn.close()

#         return jsonify({'success': True, 'message': 'User registered successfully'})

#     except Exception as e:
#         return jsonify({'success': False, 'message': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)