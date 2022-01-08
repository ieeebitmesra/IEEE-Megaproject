#---------------------------------------------------------------------------LIBRARY------------------------------------------------------------------------------
import tensorflow as tf
import cv2 as cv 
import numpy as np
import pathlib
import threading
import time as tm
import webbrowser


from pygame import time, mixer
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
from PIL import ImageTk, Image
from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras import layers
from tensorflow.python.keras.backend import batch_get_value
from tensorflow.python.keras.layers.pooling import MaxPooling2D
#---------------------------------------------------------------------------LIBRARY------------------------------------------------------------------------------


root = Tk()
root.title("GUI Train Test")
root.iconbitmap('images/icon.ico')
root.geometry("1200x800")
root.minsize(height=800, width=1200)


#--------------------------------------------------------------------------FUNCTIONS------------------------------------------------------------------------------

def skip():
    pass

def url_browse():
    url_frame.foldername = filedialog.askdirectory()
    url_entry.delete(0, END)
    url_entry.insert(0, url_frame.foldername)

def model_browse():
    model_url_frame.filename = filedialog.askopenfilename(initialdir='.', title="Select a Model", filetypes=(("All Files", "*.*"), ("h5", "*.h5")))
    model_url_entry.delete(0, END)
    model_url_entry.insert(0, model_url_frame.filename)

def test_sample():
    sample_url_frame.filename = filedialog.askdirectory()
    sample_url_entry.delete(0, END)
    sample_url_entry.insert(0, sample_url_frame.filename)


def model_test():
    head_result["text"] = "TESTING..."
    result_loss["text"] = ""
    result_accuracy["text"] = ""
    frame_result.update()


    model_path = model_url_entry.get()
    model_path = pathlib.Path(model_path)
    loaded_model = load_model(model_path)
    
    sample_path = sample_url_entry.get()
    sample_path = pathlib.Path(sample_path)

    pos = list(sample_path.glob('p/*'))
    neg = list(sample_path.glob('n/*'))

    test_name = {
        'p' : pos,
        'n' : neg
    }

    test_state = {
        'p' : 1, 
        'n' : 0
    }

    x , y = [] , []
    for name , state in test_name.items():
        for image in state:
            img = cv.imread(str(image))
            img_resized = cv.resize(img, (100, 100))
            x.append(img_resized)
            y.append(test_state[name])

    x = np.array(x)
    y = np.array(y)
    x_scaled = x / 255

    result = loaded_model.evaluate(x_scaled, y)
    
    head_result["text"] = "Results"
    result_loss["text"] = str("Loss  :  " + str(result[0]))
    result_accuracy["text"] = str("Accuracy  :  " + str(result[1]))
    frame_result.update()



def model_train():
    label_status["text"] = "TRAINING...."
    label_status.update()

    label_time_taken["text"] = ""
    label_time_taken.update()

    save_status["text"] = ""
    save_status.update()
    train_initial_time = tm.time()

    dataset_path = url_entry.get()
    dataset_path = pathlib.Path(dataset_path)

    pos = list(dataset_path.glob('p/*'))
    neg = list(dataset_path.glob('n/*'))

    test_name = {
        'p' : pos,
        'n' : neg
    }

    test_state = {
        'p' : 1, 
        'n' : 0
    }

    x , y = [] , []
    for name , state in test_name.items():
        for image in state:
            img = cv.imread(str(image))
            img_resized = cv.resize(img, (100, 100))
            x.append(img_resized)
            y.append(test_state[name])

    x = np.array(x)
    y = np.array(y)

    x_train_scaled = x/255.0
    
    model = Sequential([
        layers.Conv2D(32, 4, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 4, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(128, 4, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Flatten(),
        layers.Dense(10, activation='relu'),
        layers.Dense(2, activation='softmax')
    ])
    
    model.compile(
        optimizer=optimizer_comboBox.get(),
        loss=loss_comboBox.get(),
        metrics=[metrics_comboBox.get()]
    )
    model.fit(x_train_scaled, y, epochs=int(epoches_input.get()))

    model.save('models/model1.h5', overwrite=True)

    time_taken = tm.time() - train_initial_time

    label_time_taken["text"] = str("Time Taken :  "+str(time_taken) + " Seconds")
    label_time_taken.update()

    save_status["text"] = "MODEL SAVED AS model1.h5"
    save_status.update()

    label_status["text"] = "TRAINING COMPLETED"
    label_status.update()


def switch1():
    global cam_status 
    cam_status = 1


def switch0():
    global cam_status 
    cam_status = 0


def cam0():
    face = cv.CascadeClassifier("cascadeClassifier/haarcascade_face.xml")
    eye = cv.CascadeClassifier("cascadeClassifier/haarcascade_eye.xml")

    model = load_model("models/eyestatus.h5")

    video = cv.VideoCapture(0)

    score = 0
    initial_time = tm.time()

    mixer.init()
    mixer.music.load("audio/alert.ogg")
    while video.isOpened() == True:
        flag, frame = video.read()

        if flag == True:
            faces = face.detectMultiScale(frame)
            for fx, fy, fw, fh in faces:
                cropped_face = frame[fy : fy + fh, fx : fx + fw]
                eyes = eye.detectMultiScale(cropped_face)

                x = []
                for ex, ey, ew, eh in eyes:
                    cropped_eye = cropped_face[ey : ey + eh, ex : ex + ew]
                    cropped_eye = cv.resize(cropped_eye, (100, 100))
                    x.append(cropped_eye)
                x = np.array(x)
                global x_scaled
                x_scaled = x / 255

                if len(x) == 2:
                    predictions = model.predict(x_scaled)
                    probablities = tf.nn.softmax(predictions[0])
                    if np.argmax(probablities) == 1:
                        score = score + 1
                    else:
                        score = score - 1
            differnce_time = tm.time() - initial_time
            if differnce_time > 2:
                score_alert_label["text"] = str("Score :  " + str(score))
                if score >= 0:
                    alert_label["text"] = "Awake"
                    color_alert_change["bg"] = "green"
                    frame_main.update()
                    initial_time = tm.time()
                else:
                    alert_label["text"] = "Sleepy"
                    color_alert_change["bg"] = "red"
                    frame_main.update()
                    mixer.music.play()
                    while mixer.music.get_busy():
                        time.Clock().tick(2)

                    initial_time = tm.time()
                score = 0

            k = cv.waitKey(1) & 0xFF
            if k == 27:
                break
        frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)    
        frame = cv.resize(frame, (630, 400))
        img = ImageTk.PhotoImage(Image.fromarray(frame))
        label_cam_display["image"] = img
        if cam_status == 1:
            video.release()
            cam1()
            break
        frame_main.update()


def cam1():
    face = cv.CascadeClassifier("cascadeClassifier/haarcascade_face.xml")
    eye = cv.CascadeClassifier("cascadeClassifier/haarcascade_eye.xml")

    model = load_model("models/eyestatus.h5")

    video1 = cv.VideoCapture(1)

    score = 0
    initial_time = tm.time()

    mixer.init()
    mixer.music.load("audio/alert.ogg")
    while True:
        flag, frame = video1.read()

        if flag == True:
            faces = face.detectMultiScale(frame)
            for fx, fy, fw, fh in faces:
                cropped_face = frame[fy : fy + fh, fx : fx + fw]
                eyes = eye.detectMultiScale(cropped_face)

                x = []
                for ex, ey, ew, eh in eyes:
                    cropped_eye = cropped_face[ey : ey + eh, ex : ex + ew]
                    cropped_eye = cv.resize(cropped_eye, (100, 100))
                    x.append(cropped_eye)
                x = np.array(x)
                global x_scaled
                x_scaled = x / 255
                if len(x) == 2:
                    predictions = model.predict(x_scaled)
                    probablities = tf.nn.softmax(predictions[0])
                    if np.argmax(probablities) == 1:
                        score = score + 1
                    else:
                        score = score - 1
            differnce_time = tm.time() - initial_time
            if differnce_time > 2:
                score_alert_label["text"] = str("Score :  " + str(score))
                if score >= 0:
                    print("open")
                    alert_label["text"] = "Awake"
                    color_alert_change["bg"] = "green"
                    frame_main.update()
                    initial_time = tm.time()
                    initial_time = tm.time()
                else:
                    print("closed")
                    alert_label["text"] = "Sleepy"
                    color_alert_change["bg"] = "red"
                    frame_main.update()
                    mixer.music.play()
                    while mixer.music.get_busy():
                        time.Clock().tick(2)
                    initial_time = tm.time()
                score = 0

            k = cv.waitKey(1) & 0xFF
            if k == 27:
                break
        frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)    
        frame = cv.resize(frame, (630, 400))
        img = ImageTk.PhotoImage(Image.fromarray(frame))
        label_cam_display["image"] = img
        if cam_status == 0:
            video1.release()
            cam0()
            break
        frame_main.update()


def on_off():
    global cam_status 
    cam_status = 0
    cam0()

def OpenCode():
    webbrowser.open("https://github.com/029aman/Drowsiness-measure/blob/main/GUI%20Train%20Test%20And%20Sleep_Detector/main.py", new=1)

def dark():
    dark1 = "#313131"
    outermost_frame.config(bg=dark1)
    workspace_frame.config(bg=dark1)
    frame_train.config(bg=dark1)

def Started_About():
    webbrowser.open("https://github.com/Adi1707/Driver-Alertness-System/blob/main/README.md", new=1)


#--------------------------------------------------------------------------FUNCTIONS------------------------------------------------------------------------------

#---------------------------------------------------------------------------MENU BAR-------------------------------------------------------------------------------- 
menu_bar = Menu(root)

File = Menu(root, tearoff=0)
menu_bar.add_cascade(label="File", menu=File)
File.add_command(label="Open Code", command=OpenCode)
File.add_separator()
File.add_command(label="Exit", command=root.quit)


Help = Menu(root, tearoff=0)
menu_bar.add_cascade(label="Help", menu=Help)
Help.add_command(label="Get Started", command=Started_About)
Help.add_separator()
Help.add_command(label="About", command=Started_About)

root.config(menu=menu_bar)

#----------------------------------------------------------------------------MENU BAR--------------------------------------------------------------------------------
outermost_frame =Frame(root)
outermost_frame.pack(fill=BOTH, expand=1)
workspace_frame = Frame(outermost_frame)
workspace_frame.pack(fill=BOTH, anchor=N, side=TOP)

#------------------------------------------------------------------------------TABS----------------------------------------------------------------------------------- 
tabs = ttk.Notebook(workspace_frame)

#-----------TAB 1-----------#
frame_train = Frame(tabs)
frame_train.pack(fill=BOTH, expand=1)
img_train = cv.imread("images/img_train.png")
img_train = cv.cvtColor(img_train, cv.COLOR_RGB2BGR)
img_train = cv.resize(img_train, (96,38))
img_train = ImageTk.PhotoImage(Image.fromarray(img_train))
tabs.add(frame_train, image=img_train)
#-----------TAB 1-----------#

#-----------TAB 2-----------#
frame_test = Frame(tabs)
frame_test.pack(fill=BOTH, expand=1)
img_test = cv.imread("images/img_test.png")
img_test = cv.cvtColor(img_test, cv.COLOR_RGB2BGR)
img_test = cv.resize(img_test, (96,38))
img_test = ImageTk.PhotoImage(Image.fromarray(img_test))
tabs.add(frame_test, image=img_test)
#-----------TAB 2-----------#

#-----------TAB 3-----------#
frame_main = Frame(tabs)
frame_main.pack(fill=BOTH, expand=1)
img_main = cv.imread("images/img_main.png")
img_main = cv.cvtColor(img_main, cv.COLOR_RGB2BGR)
img_main = cv.resize(img_main, (96,38))
img_main = ImageTk.PhotoImage(Image.fromarray(img_main))
tabs.add(frame_main, image=img_main)
#-----------TAB 3-----------#


tabs.pack(fill=BOTH)
#------------------------------------------------------------------------------TABS----------------------------------------------------------------------------------- 

#----------------------------------------------------------------------------Status Bar------------------------------------------------------------------------------------
statusBar_frame = Frame(outermost_frame).pack(fill=BOTH, anchor=S)
status_info_frame = Frame(statusBar_frame, bg="#A7ACB0", height=10)



status_info_frame.pack(fill=BOTH, anchor=S, side=BOTTOM)
#----------------------------------------------------------------------------Status Bar------------------------------------------------------------------------------------

#---------------------------------------------------------------------------TAB 1 FRAME(Train)----------------------------------------------------------------------------

#------------Train Frame URL--------------

frame_train_url = LabelFrame(frame_train, text="Path")
url_frame = Frame(frame_train_url)

url = Label(url_frame, text="Sample Folder  :  ")
url.pack(side=LEFT, anchor=W, padx=(15, 5))

url_entry_frame =Frame(url_frame)
url_entry = Entry(url_entry_frame)
url_entry.pack(side=LEFT, anchor="center", fill=X, expand=1)
url_entry_frame.pack(side=LEFT, fill=X, expand=1)


img_browse = cv.imread("images/img_browse.png")
img_browse = cv.resize(img_browse, (100, 30))
img_browse = ImageTk.PhotoImage(Image.fromarray(img_browse))
url_btn = Button(url_frame, image=img_browse, command=url_browse)
url_btn.pack(side=RIGHT, anchor=E, padx=15, pady=55)

url_frame.pack(fill=BOTH)
frame_train_url.pack(fill=BOTH, padx=20, pady=(10, 20))
#------------Train Frame URL-----------------



#------------Train Frame Compiler--------------

frame_train_compiler = LabelFrame(frame_train, text="Compile")
compiler_frame = Frame(frame_train_compiler)

compiler_optimizer_frame=Frame(compiler_frame)
optimizer_label = Label(compiler_optimizer_frame, text="Optimizer :  ")
optimizer_label.pack(side=LEFT)

optimizer_options = [
    "--select--",
    "adam",
    "SGD"
]

optimizer_comboBox = ttk.Combobox(compiler_optimizer_frame, values=optimizer_options)
optimizer_comboBox.current(0)
optimizer_comboBox.bind("<<ComboboxSelected>>", skip)
optimizer_comboBox.pack(side=LEFT)
compiler_optimizer_frame.pack(side=LEFT, anchor=W, expand=1, fill=X, padx=(15, 0), pady=(55, 80))

#--------------------------

compiler_loss_frame = Frame(compiler_frame)
loss_label = Label(compiler_loss_frame, text="Loss  :  ")
loss_label.pack(side=LEFT)

loss_options = [
    "--select--",
    "sparse_categorical_crossentropy",
    "categorical_crossentropy"
]

loss_comboBox = ttk.Combobox(compiler_loss_frame, values=loss_options)
loss_comboBox.current(0)
loss_comboBox.bind("<<ComboboxSeleceted>>", skip)
loss_comboBox.pack(side=LEFT)
compiler_loss_frame.pack(side=LEFT, anchor=CENTER, expand=1, fill=X, padx=(15, 0), pady=(55, 80))
#-------------------------

compiler_metrics_frame = Frame(compiler_frame)
metrics_label = Label(compiler_metrics_frame, text="Metrics  :  ")
metrics_label.pack(side=LEFT)

metrics_options = [
    "--select--",
    "accuracy"
]

metrics_comboBox = ttk.Combobox(compiler_metrics_frame, values=metrics_options)
metrics_comboBox.current(0)
metrics_comboBox.bind("<<ComboboxSelected>>", skip)
metrics_comboBox.pack(side=LEFT)
compiler_metrics_frame.pack(side=RIGHT, expand=1, fill=X, pady=(55, 80), padx=(15, 15))
#---------------------------

compiler_frame.pack(fill=BOTH, expand=1)
frame_train_compiler.pack(fill=BOTH, padx=20, pady=20, expand=1)

#------------Train Frame Compiler--------------



#------------Train Frame Fit--------------
frame_train_fit = LabelFrame(frame_train, text="Fit")
fit_frame = Frame(frame_train_fit)

fit_epoches_frame = Frame(fit_frame)
fit_label = Label(fit_epoches_frame, text="Epoches  :  ")
fit_label.pack(side=LEFT)
epoches_input = Spinbox(fit_epoches_frame, from_=1, to=30)
epoches_input.pack(side=LEFT)
fit_epoches_frame.pack(pady=25, side=LEFT, padx=(15, 15))

fit_start_frame = Frame(fit_frame)
img_start = cv.imread("images/img_start.png")
img_start = ImageTk.PhotoImage(Image.fromarray(img_start))
Start_btn = Button(fit_start_frame, image=img_start, command=lambda : threading.Thread(target=model_train).start())
Start_btn.pack()
fit_start_frame.pack(side=RIGHT, padx=15, pady=30)

fit_frame.pack(side=LEFT ,fill=BOTH, expand=1)
frame_train_fit.pack(fill=BOTH, padx=20, pady=20, expand=1)
#------------Train Frame Fit--------------


#------------Train Frame LOGs--------------
frame_train_info = Frame(frame_train)
info_frame = Frame(frame_train_info, height=100)

label_status = Label(info_frame, text="GIVE INPUTS", font=("comicsansms 60 bold") )
label_status.pack(anchor=CENTER, fill=BOTH, expand=1)

label_time_taken = Label(info_frame, font=("comicsansms 10 italic"))
label_time_taken.pack(anchor=CENTER, fill=BOTH, expand=1, pady=10)

save_status = Label(info_frame, font=("comicsansms 20 italic"))
save_status.pack(anchor=CENTER, fill=BOTH, expand=1, pady=10)

info_frame.pack(fill=BOTH, expand=1)
frame_train_info.pack(expand=1, fill=BOTH, padx=20, pady=20)

#------------Train Frame LOGs--------------

#---------------------------------------------------------------------------TAB 1 FRAME(Train)----------------------------------------------------------------------------


#---------------------------------------------------------------------------TAB 2 FRAME(Test)----------------------------------------------------------------------------

#-------------------Model Url---------------
frame_test_model_url = LabelFrame(frame_test, text="Model")
model_url_frame = Frame(frame_test_model_url)

model_url = Label(model_url_frame, text="Model Location  :  ")
model_url.pack(side=LEFT, anchor=W, padx=(15, 5))

model_url_entry_frame =Frame(model_url_frame)
model_url_entry = Entry(model_url_entry_frame)
model_url_entry.pack(side=LEFT, anchor="center", fill=X, expand=1)
model_url_entry_frame.pack(side=LEFT, fill=X, expand=1)


img_browse1 = cv.imread("images/img_browse.png")
img_browse1 = cv.resize(img_browse1, (100, 30))
img_browse1 = ImageTk.PhotoImage(Image.fromarray(img_browse1))
model_url_btn = Button(model_url_frame, image=img_browse1, command=model_browse)
model_url_btn.pack(side=RIGHT, anchor=E, padx=15, pady=25)

model_url_frame.pack(fill=BOTH)
frame_test_model_url.pack(fill=BOTH, padx=20, pady=10)
#-------------------Model Url---------------

#-------------------Sample Test Url---------------
frame_test_sample_url = LabelFrame(frame_test, text="Sample Data")
sample_url_frame = Frame(frame_test_sample_url)

sample_url = Label(sample_url_frame, text="Sample Folder   :  ")
sample_url.pack(side=LEFT, anchor=W, padx=(15, 5))

sample_url_entry_frame =Frame(sample_url_frame)
sample_url_entry = Entry(sample_url_entry_frame)
sample_url_entry.pack(side=LEFT, anchor="center", fill=X, expand=1)
sample_url_entry_frame.pack(side=LEFT, fill=X, expand=1)


img_browse2 = cv.imread("images/img_browse.png")
img_browse2 = cv.resize(img_browse2, (100, 30))
img_browse2 = ImageTk.PhotoImage(Image.fromarray(img_browse2))
sample_url_btn = Button(sample_url_frame, image=img_browse2, command=test_sample)
sample_url_btn.pack(side=RIGHT, anchor=E, padx=15, pady=25)

sample_url_frame.pack(fill=BOTH)
frame_test_sample_url.pack(fill=BOTH, padx=20, pady=10)
#-------------------Sample Test Url---------------

#----------------------Test Start-------------------
frame_test_start = Frame(frame_test)
start_test_frame = Frame(frame_test_start)


img_start1 = cv.imread("images/img_start.png")
img_start1 = ImageTk.PhotoImage(Image.fromarray(img_start1))
Start_btn_test = Button(start_test_frame, image=img_start1, command=lambda : threading.Thread(target=model_test).start())
Start_btn_test.pack()


start_test_frame.pack(fill=BOTH)
frame_test_start.pack(fill=BOTH, padx=20, pady=10)
#----------------------Test Start-------------------

#----------------------Result--------------------
result_frame = Frame(frame_test)
frame_result =Frame(result_frame)

head_result = Label(frame_result, text="GIVE INPUT", font=("comicsansms 60 bold") )
head_result.pack(anchor=CENTER, fill=BOTH, expand=1, pady=10)

result_accuracy = Label(frame_result, font=("comicsansms 30 italic"))
result_accuracy.pack(anchor=CENTER, fill=BOTH, expand=1, pady=10)

result_loss = Label(frame_result, font=("comicsansms 30 italic"))
result_loss.pack(anchor=CENTER, fill=BOTH, expand=1, pady=10)

frame_result.pack(fill=BOTH, expand=1)
result_frame.pack(fill=BOTH, expand=1, side=LEFT, padx=20, pady=10)
#----------------------Result--------------------


#---------------------------------------------------------------------------TAB 2 FRAME(Test)----------------------------------------------------------------------------



#---------------------------------------------------------------------------TAB 3 FRAME(Main)----------------------------------------------------------------------------

main1 = Frame(frame_main)
color_alert = LabelFrame(main1, text="COLOR")
color_alert_change = Frame(color_alert, bg="black")
color_alert_change.pack(padx=20, pady=20, expand=1, fill=BOTH)
color_alert.pack(side=LEFT, anchor=W, fill=BOTH, expand=1, padx=20, pady=10)


cam_display = LabelFrame(main1, text="Display", height=650, width=480)
img_camOFF = ImageTk.PhotoImage(Image.open('images/img_camOFF.png'))
label_cam_display = Label(cam_display, bg="beige", image=img_camOFF)
label_cam_display.pack()
cam0_btn = Button(cam_display, text="Cam 0", command=switch0)
cam0_btn.pack(expand=1, fill=X, anchor=S, side=LEFT)
on__btn = Button(cam_display, text="ON", command=on_off)
on__btn.pack(expand=1, fill=X, side=LEFT, anchor=S)
cam1_btn = Button(cam_display, text="Cam 1", command=switch1)
cam1_btn.pack(expand=1, fill=X, anchor=S, side=RIGHT)
cam_display.pack(side=RIGHT, anchor=E, fill=BOTH, expand=1, padx=20, pady=10)
main1.pack(fill=BOTH)

main2 = Frame(frame_main)
text_alert = LabelFrame(main2, text="Alert")
alert_label = Label(text_alert, font=("comicsansms 60 bold"))
alert_label.pack(anchor=CENTER, expand=1, fill=BOTH)
text_alert.pack(side=LEFT, anchor=W, fill=BOTH, expand=1, padx=20, pady=10)


score_alert = LabelFrame(main2, text="Score")
score_alert_label = Label(score_alert, font=("comicsansms 60 bold"))
score_alert_label.pack(anchor=CENTER, expand=1, fill=BOTH)
score_alert.pack(side=RIGHT, anchor=E, fill=BOTH, expand=1, padx=20, pady=10)
main2.pack(fill=BOTH, expand=1)
#---------------------------------------------------------------------------TAB 3 FRAME(Main)----------------------------------------------------------------------------
root.mainloop()