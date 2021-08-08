from flask import Flask, flash, render_template, request, jsonify
from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import yaml
import os
import sys
import sqlite3 as sql
from flask import jsonify
## Import Libraries related to Image Classification
import keras
keras.backend.clear_session()
from keras.models import load_model
from skimage import io
from skimage import transform
import numpy as np
import cv2
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing import image
import json
import uuid
import base64


app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'LPje8E8Jkx'

def db_connect():
    conn = sql.connect('database.sq3')
    return conn

def db_close(conn):
    conn.close()


"""
Convert a Tuple into a Dictionary(Helps to convert to JSON)
"""
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


"""
Any Student who is logged in, can take an exam.
An exam will involve showing letters from A-Z.
Students can answer these.

A User (Teacher ideally) can create an exam.
This will be open for any student.

"""
    
@app.route('/predict', methods=['POST'])
@cross_origin(origin='*')
def predict():
    if request.method == 'POST':
        filename=""
        predictions=[]
        print("IN HERE")
        
        try:
            # check if the post request has the file part
            print("INSIDE TRY")
            if 'file' not in request.form:
                return jsonify({"failed":True})
            print("READING FILE")
            # file = request.files['file']
            # Encode Base64 Image
            
            b = request.form['file']
            z = b.split(',')
            print(len(z))
            #print(z)
            filename = "image_"+str(uuid.uuid4())+".jpg"
            #im = Image.open(io.BytesIO(base64.b64decode(z))).save(filename)
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename),"wb") as fh:
                fh.write(base64.b64decode(z[1]))
            
            actual = request.form['actual']

            # if user does not select file, browser also
            # submit a empty part without filename
            print("Checking File")
            if filename:
                print("VALID. SAVING")
                # filename = secure_filename(file.filename)
                # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                ## Load Saved Image and Load Model
                print("LOADING FILE")
                img = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # img = img[173:(173+316), 679:(679+316)]
                img = img[190:(190+323), 50:(50+323)]
                cv2.imwrite(os.path.join(app.config['UPLOAD_FOLDER'], "sample.jpg"), img)
                
                print("RESIZE FILE")
                img = cv2.resize(img, (64,64))
                cv2.imwrite(os.path.join(app.config['UPLOAD_FOLDER'], "sample_resized.jpg"), img)
                imgs=[]
                imgs.append(img)
                print("NUMPY FILE")
                imgs=np.asarray(imgs)
                imgs.astype('float32')/255
                """ Start Loading Model """
                print("LOAD MODEL")
                model = load_model('cstm-model.h5')
                """ Post Loading Model - Obtain predictions """
                predictions = model.predict(imgs)

                print(predictions)
                """ Get Predicted Label """
                labels=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','del','nothing','space']
                predicted_class = labels[np.argmax(predictions)]

                print("Predicted Class: "+predicted_class)
                print("Actual Class: "+actual)
                if predicted_class == actual:
                    return jsonify({"match":True})
                else:
                    return jsonify({"match":False})

        except Exception as e:
            print("Failed to Obtain predictions", sys.exc_info()[0])
            print(e)

        return jsonify({"failed":True})

@app.route('/letterpredict', methods=['POST'])
@cross_origin(origin='*')
def letterpredict():
    if request.method == 'POST':
        filename=""
        predictions=[]
        print("IN HERE")
        
        try:
            # check if the post request has the file part
            print("INSIDE TRY")
            if 'file' not in request.form:
                return jsonify({"failed":True})
            print("READING FILE")
            # Encode Base64 Image
            
            b = request.form['file']
            z = b.split(',')
            print(len(z))
            #print(z)
            filename = "image_"+str(uuid.uuid4())+".jpg"
            #im = Image.open(io.BytesIO(base64.b64decode(z))).save(filename)
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename),"wb") as fh:
                fh.write(base64.b64decode(z[1]))

            # if user does not select file, browser also
            # submit a empty part without filename
            print("Checking File")
            if filename:
                print("VALID. SAVING")
                # filename = secure_filename(file.filename)
                # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                ## Load Saved Image and Load Model
                print("LOADING FILE")
                img = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # img = img[173:(173+316), 679:(679+316)]
                img = img[190:(190+323), 50:(50+323)]
                cv2.imwrite(os.path.join(app.config['UPLOAD_FOLDER'], "sample.jpg"), img)
                
                print("RESIZE FILE")
                img = cv2.resize(img, (64,64))
                cv2.imwrite(os.path.join(app.config['UPLOAD_FOLDER'], "sample_resized.jpg"), img)
                imgs=[]
                imgs.append(img)
                print("NUMPY FILE")
                imgs=np.asarray(imgs)
                imgs.astype('float32')/255
                """ Start Loading Model """
                print("LOAD MODEL")
                model = load_model('cstm-model.h5')
                """ Post Loading Model - Obtain predictions """
                predictions = model.predict(imgs)

                print(predictions)
                """ Get Predicted Label """
                labels=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','del','nothing','space']
                predicted_class = labels[np.argmax(predictions)]

                print("Predicted Class: "+predicted_class)

                return jsonify({"letter":predicted_class})

        except Exception as e:
            print("Failed to Obtain predictions", sys.exc_info()[0])
            print(e)

        return jsonify({"failed":True})

## Users
@app.route('/user', methods=['GET','POST', 'PUT', 'DELETE'])
@cross_origin(origin='*')
def users():
    if request.method == 'POST':
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val=False
            ## Read Data in POST Request - JSON
            json_data = request.json
            username=json_data['username']
            password=json_data['password']
            name=json_data['name']
            email=json_data['email']
            role=json_data['role']

            with conn:
                cur = conn.cursor()
                cur.execute("INSERT into user (username,password,name,email,role) VALUES (?,?,?,?,?)", (username, password, name, email, role))

                conn.commit()

                return_val=True
        except sql.Error as error:
            print("Failed to insert record into sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})
    elif request.method == 'GET' and ('username' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            ## Read Data in GET Request
            username = request.args['username']
            row=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM user WHERE username=?", (username,))
                row=cur.fetchone()

                conn.commit()
        except sql.Error as error:
            print("Failed to select records from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)
    elif request.method == 'GET' and ('id' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            ## Read Data in GET Request
            id = request.args['id']
            row=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM user WHERE id=?", (id,))
                row=cur.fetchone()

                conn.commit()
        except sql.Error as error:
            print("Failed to select records from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)
    elif request.method == 'GET':
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            rows=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM user")
                rows=cur.fetchall()

                conn.commit()
        except sql.Error as error:
            print("Failed to select records from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(rows)
    elif request.method == 'PUT' and ('userid' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val=False
            ## Read Data in PUT Request - JSON
            json_data = request.json
            userid = request.args['userid']
            username=json_data['username']
            password=json_data['password']
            name=json_data['name']
            email=json_data['email']
            role=json_data['role']

            with conn:
                cur = conn.cursor()
                cur.execute("UPDATE user SET username=?, password=?, name=?, email=?, role=? WHERE id=?", (username, password, name, email, role, userid))

                if (cur.rowcount < 1):
                    return_val=False
                else:
                    return_val=True

                conn.commit()
        except sql.Error as error:
            print("Failed to update records in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})
    elif request.method == 'DELETE':
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val=False
            ## Read Data in DELETE Request - JSON
            userid = request.args['userid']

            with conn:
                cur = conn.cursor()
                cur.execute("DELETE FROM user WHERE id=?",(userid))

                if (cur.rowcount < 1):
                    return_val = False
                else:
                    return_val = True
                
                conn.commit()
        except sql.Error as error:
            print("Failed to delete records in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})

## Messenger
@app.route('/messenger',methods=['GET','POST','PUT','DELETE'])
@cross_origin(origin='*')
def messenger():
    if request.method == 'POST':
        # Connect to SQLite Database
        conn = db_connect()

        try:
            return_val=False
            print("READ JSON")
            ## Read Data in POST Request - JSON
            json_data = request.json
            print(json_data)
            studentid=json_data["studentid"]
            message=json_data["message"]

            with conn:
                cur = conn.cursor()
                cur.execute("INSERT INTO message (student, message) VALUES(?, ?)", (studentid, message))
                conn.commit()

                return_val=True
        except sql.Error as error:
            print("Failed to insert data into sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})
    
    elif request.method == 'GET':
        # Connect to SQLite Database
        conn = db_connect()

        try:
            # Retrieve all messages
            rows=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM message")
                rows = cur.fetchall()

        except sql.Error as error:
            print("Failed to retrieve record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(rows)
    elif request.method == 'GET' and ('studentid' in request.args):
        # Connect to SQLite Database
        conn = db_connect()

        try:
            ## Read ID and Get Details of all the instances of that exam taken by the student
            studentid = request.args['studentid']
            row=[]
            
            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM message WHERE student=?", (studentid))
                row = cur.fetchall()

        except sql.Error as error:
            print("Failed to retrieve record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")
        
        return jsonify(row)
    elif request.method == 'PUT':
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val = False
            ## Read ID and Update Details of Exam
            json_data = request.json

            id = json_data['id']
            message = json_data['message']

            row=[]

            with conn:
                cur = conn.cursor()
                cur.execute("UPDATE message SET message = ? WHERE id = ?", (message, id))

                if (cur.rowcount < 1):
                    return_val = False
                else:
                    return_val = True
        
        except sql.Error as error:
            print("Failed to update record in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")
        
        return jsonify({"return":return_val})
    elif request.method == 'DELETE':
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val = False
            ## Read ID and Delete Message
            json_data = request.json
            id = json_data['id']

            with conn:
                cur = conn.cursor()
                cur.execute("DELETE FROM message WHERE id=?", (id))

                if (cur.rowcount < 1):
                    return_val = False
                else:
                    return_val = True
        except sql.Error as error:
            print("Failed to delete record in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})

## Login
@app.route('/login', methods=['POST'])
@cross_origin(origin='*')
def login():
    if request.method == 'POST':
        # Connect to SQLite Database
        conn = db_connect()

        try:
            return_val=False
            ## Read Data in POST Request - JSON
            json_data = request.json
            username=json_data["username"]
            password=json_data["password"]
            row=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM user WHERE username=? AND password=?", (username,password))
                row=cur.fetchone()
        
        except sql.Error as error:
            print("Failed to get data from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")
        
        return jsonify(row)
    
## Student Login
@app.route('/student/login', methods=['POST'])
@cross_origin(origin='*')
def student_login():
    if request.method == 'POST':
        # Connect to SQLite Database
        conn = db_connect()

        try:
            return_val=False
            ## Read Data in POST Request - JSON
            json_data = request.json
            username=json_data["username"]
            password=json_data["password"]
            row=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM student WHERE username=? AND password=?", (username,password))
                row=cur.fetchone()

        except sql.Error as error:
            print("Failed to get data from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)
    
## Students Exam
@app.route('/student/exam', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin(origin='*')
def student_exam():
    if request.method == 'POST':
        # Connect to SQLite Database
        conn = db_connect()
        
        try:
            return_val=False
            ## Read Data in POST Request - JSON
            json_data = request.json
            attempt=json_data["attemp"] # Attempt
            student=json_data["studentid"]
            correct=json_data["correct"]
            incorrect=json_data["incorrect"]

            with conn:
                cur=conn.cursor()
                cur.execute("INSERT INTO student_exam (exam, student, correct, incorrect) VALUES(?,?,?,?)", (attempt,student,correct,incorrect))

                conn.commit()
                
                return_val = True
        except sql.Error as error:
            print("Failed to insert record into sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})
    elif request.method == 'GET' and ('studentid' in request.args) and ('attempt' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            ## Read ID and Get Details of all the instances of that exam taken by the student
            studentid = request.args['studentid']
            attempt = request.args['attempt']
            row=[]
            
            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM student_exam WHERE attempt=? AND student=?", (attempt, studentid))
                row = cur.fetchall()

        except sql.Error as error:
            print("Failed to retrieve record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")
        
        return jsonify(row)
    elif request.method == 'GET' and ('id' in request.args) and ('studentid' in request.args) and ('attempt' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            ## Read ID and Get Details of Exam
            studentid = request.args['studentid']
            attempt = request.args['attempt']
            row=[]

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM student_exam WHERE id=? AND exam=? AND student=?", (id, attempt, studentid))
                row = cur.fetchall()

        except sql.Error as error:
            print("Failed to retrieve record into sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)
    elif request.method == 'PUT' and ('id' in request.args) and ('studentid' in request.args) and ('attempt' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val = False
            ## Read ID and Update Details of Exam
            id = request.args['id']
            studentid = request.args['studentid']
            attempt = request.args['attempt']
            # JSON Data
            json_data = request.json
            correct = json_data["correct"]
            incorrect = json_data["incorrect"]

            row=[]

            with conn:
                cur = conn.cursor()
                cur.execute("UPDATE student_exam SET correct = ?, incorrect = ? WHERE id = ?", (correct, incorrect, id))

                if (cur.rowcount < 1):
                    return_val = False
                else:
                    return_val = True
        
        except sql.Error as error:
            print("Failed to update record in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")
        
        return jsonify({"return":return_val})
    elif request.method == 'DELETE' and ('studentid' in request.args) and ('attempt' in request.args):
        # Connect to the SQLite Database
        conn = db_connect()

        try:
            return_val = False
            ## Read ID and Delete all instances of that specific exam taken by the Student with the given ID
            studentid = request.args['studentid']
            attempt = request.args['attempt']

            with conn:
                cur = conn.cursor()
                cur.execute("DELETE FROM student_exam WHERE exam=? AND student=?", (attempt, studentid))

                conn.commit()

            return_val = True
        except sql.Error as error:
            print("Failed to delete record in sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection ic closed")
        
        return jsonify({"return":return_val})
                    
## Students
@app.route('/student', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin(origin='*')
def students():
    if request.method == 'POST':
        return_val = False
        # Connect to SQLite Database
        conn = db_connect()
        try:
            ## Read Data in POST Request - JSON
            json_data = request.json
            print(json_data)
            username=json_data["username"]
            password=json_data["password"]
            name=json_data["name"]
            email=json_data["email"]
            year=json_data["year"]

            with conn:
                cur = conn.cursor()
                cur.execute("INSERT INTO student (username,password,name,email,year) VALUES(?,?,?,?,?)", (username,password,name,email,year))

                conn.commit()
                
                return_val = True
        except sql.Error as error:
            print("Failed to insert record into sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})
    elif request.method == 'GET' and 'username' in request.args:
        # Connect to SQLite Database
        conn = db_connect()
        try:
            ## Read Username and Get Student Details
            username = request.args['username']
            row = []

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM student WHERE username=?", (username,))
                row=cur.fetchall()

        except sql.Eror as error:
            print("Failed to get record from sqlite table using username", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)
    elif request.method == 'GET' and 'id' in request.args:
        # Connect to SQLite Database
        conn = db_connect()
        try:
            ## Read ID and Get Student Details
            id = request.args['id']
            row = []

            with conn:
                conn.row_factory = dict_factory
                cur = conn.cursor()
                cur.execute("SELECT * FROM student WHERE id=?", (id,))
                row=cur.fetchall()

        except sql.Error as error:
            print("Failed to update record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify(row)

    elif request.method == 'PUT' and 'id' in request.args:
        # Connect to SQLite Database
        conn = db_connect()
        try:
            ## Read ID and Update Student Details
            id = request.args['id']
            json_data = request.json
            username=json_data["username"]
            password=json_data["password"]
            name=json_data["name"]
            email=json_data["email"]
            year=json_data["year"]
            
            return_val = False

            with conn:
                cur = conn.cursor()
                cur.execute("UPDATE student SET username = ?, password = ?, name = ?, email = ?, year = ? WHERE id = ?", (username,password,name,email,year, id))

                if cur.rowcount < 1:
                    return_val = False
                else:
                    return_val = True
                
                conn.commit()
        except sql.Error as error:
            print("Failed to update record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})

    elif request.method == 'DELETE' and 'id' in request.args:
        # Connect to SQLite Database
        conn = db_connect()
        
        try:
            ## Read ID and Delete Student with Given ID
            id = request.args['id']
            return_val = False

            with conn:
                cur = conn.cursor()
                cur.execute("DELETE FROM student WHERE id = ?", (id,))

                conn.commit()

            return_val = True
        except sql.Error as error:
            print("Failed to update record from sqlite table", error)
        finally:
            if (conn):
                # Close the Database Connection
                db_close(conn)
                print("The sqlite connection is closed")

        return jsonify({"return":return_val})

    else:
        conn = db_connect()
        conn.row_factory = dict_factory
        cur = conn.cursor()
        cur.execute("SELECT * FROM student")

        rows=cur.fetchall()
        json_rows=[]

        for row in rows:
            json_rows.append(row)

        return jsonify(json_rows)

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0",port="8080")
