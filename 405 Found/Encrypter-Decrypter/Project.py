import tkinter as tk
from tkinter import *
import cryptocode


screen=tk.Tk()
screen.geometry("512x512")
screen.title("Encrypter and Decrypter")
screen.configure(borderwidth="10",relief="sunken",background="#3B3F3F",cursor="arrow")
screen.resizable(False,False)

def encrypt():
    code=ttext1.get()
    if len(code)==4:
        screen1=tk.Toplevel(screen)
        screen1.geometry("300x300")
        screen1.title("Text after encryption")
        screen1.configure(borderwidth="10",relief="sunken",background="#3B3F3F",cursor="arrow")
        screen1.resizable(FALSE,FALSE)

        message=ttext.get(1.0,END)
        str_encoded = cryptocode.encrypt(message,code)

        label_pro=tk.Label(screen1,text="Your Encrypted Text ",padx=5,bg="#3B3F3F",fg="white",font=("ariel", 14 ,"bold"),relief="flat")
        label_pro.place(x=40,y=5)
        text2=Text(screen1,font="30",wrap=WORD,relief="sunken")
        text2.place(x=5,y=40,width=275,height= 180)
        text2.insert(END,str_encoded)
        exit_button = Button(screen1, text="Close",font=("Helvetica",13,"bold"), command=screen1.destroy)
        exit_button.place(x=105,y=230)
    else:
        screen1=tk.Toplevel(screen)
        screen1.geometry("300x300")
        screen1.title("Error !!! ")
        screen1.configure(borderwidth="10",relief="sunken",background="#3B3F3F",cursor="arrow")
        screen1.resizable(FALSE,FALSE)

        label_pro=tk.Label(screen1,text="Enter Valid Secret code !! ",padx=5,bg="#3B3F3F",fg="Red",font=("ariel", 14 ,"bold"),relief="flat")
        label_pro.place(x=20,y=5)
        exit_button = Button(screen1, text="Try Again",font=("Helvetica",13,"bold"), command=screen1.destroy)
        exit_button.place(x=105,y=50)
       


def decrypt():
    code=ttext1.get()
    message=ttext.get(1.0,END)
    str_decoded = cryptocode.decrypt(message,code)
    
    if str_decoded!=0:
        screen2=tk.Toplevel(screen)
        screen2.geometry("300x300")
        screen2.title("Text after Decryption")
        screen2.configure(borderwidth="10",relief="sunken",background="#3B3F3F",cursor="arrow")
        screen2.resizable(FALSE,FALSE)

        label_pro=tk.Label(screen2,text="Your Secret Message is ",padx=5,bg="#3B3F3F",fg="white",font=("ariel", 14 ,"bold"),relief="flat")
        label_pro.place(x=40,y=5)
        text2=tk.Text(screen2,font="30",wrap=WORD,relief="sunken")
        text2.place(x=5,y=40,width=275,height= 180)
        text2.insert(END,str_decoded)
        exit_button = tk.Button(screen2, text="Close",font=("Helvetica",13,"bold"), command=screen2.destroy)
        exit_button.place(x=105,y=230)


    else:
        screen2=tk.Toplevel(screen)
        screen2.geometry("300x300")
        screen2.title("Error !!! ")
        screen2.configure(borderwidth="10",relief="sunken",background="#3B3F3F",cursor="arrow")
        screen2.resizable(FALSE,FALSE)

        label_pro=tk.Label(screen2,text="Enter Valid Secret code !! ",padx=5,bg="#3B3F3F",fg="Red",font=("ariel", 14 ,"bold"),relief="flat")
        label_pro.place(x=20,y=5)
        exit_button = Button(screen2, text="Try Again",font=("Helvetica",13,"bold"), command=screen2.destroy)
        exit_button.place(x=105,y=50)
       
label_pro=tk.Label(screen,text="Enter the text for Encryption and Decryption below",padx=5,bg="#3B3F3F",fg="white",font=("ariel", 14 ,"bold"),relief="flat")
label_pro.place(x=5,y=5)
ttext=tk.Text(screen,font=("Comic Sans Ms",13),bg="white",fg="black",relief="sunken")
ttext.place(x=5,y=45,height=120,width=485)

label_pro=tk.Label(screen,text="Enter 4 digit Secret Key",bg="#3B3F3F",fg="white",font=("ariel",15,"bold","italic"),relief="flat")
label_pro.place(x=5,y=200)


ttext1= tk.Entry(bg="white",fg="black",font=("Comic Sans Ms",15),relief="sunken",show='*')
ttext1.place(x=250,y=200,width=100)

b1=tk.Button(screen,text="Encrypt",font=("Helvetica",15,"bold"),activebackground="red",fg="white",bg="green",activeforeground="black",command=encrypt)
b1.place(x=200,y=250)

b2=tk.Button(screen,text="Decrypt",font=("Helvetica",15,"bold"),activebackground="green",fg="white",bg="red",activeforeground="black",command=decrypt)
b2.place(x=330,y=250)

b3=tk.Button(screen,text="Exit",font=("Helvetica",15,"bold"),activebackground="grey",fg="black",bg="white",activeforeground="white",command=screen.destroy)
b3.place(x=285,y=300)

mainloop()


