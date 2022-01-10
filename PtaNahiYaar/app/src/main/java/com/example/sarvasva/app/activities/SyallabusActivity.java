package com.example.sarvasva.app.activities;

import static java.lang.String.valueOf;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.sarvasva.R;
import com.google.firebase.firestore.FirebaseFirestore;

import android.content.Intent;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;

import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Objects;

public class SyallabusActivity extends AppCompatActivity {

    private FrameLayout frameLayout;
    private Button nextBtn;

   private Spinner spinnerCourse;
   private Spinner spinnerBranch;
   private Spinner spinnerSem;
   private Spinner spinnerSubject;

   private ArrayAdapter<String>adapterCourse ,  adapterBranch , adapterSem , adapterSubject;
   private ArrayList<String> course ;
   private ArrayList<String> BTECH , BARCH , BBA ;
   private ArrayList<String> CSE , ECE , IT , MECH, EEE, Chemical,Production, Biotech , BARCHBranch , BBABranch;
   private ArrayList<String> CSEsem1 , CSEsem2 , ECEsem1 ,ECEsem2 , EEEsem1 ,EEEsem2, ITsem1 , ITsem2 , MECHsem1 , MECHsem2,
           Productionsem1 , Productionsem2 , Biotechsem1 , Biotechsem2 ,
           Chemicalsem1  , Chemicalsem2 , BARCHsem1 , BBAsem1;
   private ArrayList<String> Tensem , Sixsem , Eightsem ;

   private FirebaseFirestore firestore;

   private String courseSet , branchSet  , semSet , subjectSet ;
   private TextView courseCodeTv , courseTitleTv , module1Tv, module5Tv, module4Tv,
           module3Tv, module2Tv , referenceBookTv , textBookTv;

   private String courseCode , courseTitle , module1, module5,
           module4, module3, module2 , referenceBook , textBook ;
   private String selectedCourse,selectedBranch,selectedSubject,selectedSem;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_syallabus);




        firestore = FirebaseFirestore.getInstance();

        nextBtn = findViewById(R.id.nextBtn);

        courseCodeTv = findViewById(R.id.courseCodeTv);
        courseTitleTv = findViewById(R.id.courseTitleTv);
        module1Tv = findViewById(R.id.module1Tv);
        module2Tv = findViewById(R.id.module2Tv);
        module3Tv = findViewById(R.id.module3Tv);
        module4Tv = findViewById(R.id.module4Tv);
        module5Tv = findViewById(R.id.module5Tv);
        textBookTv = findViewById(R.id.textBookTv);
        referenceBookTv = findViewById(R.id.referenceBookTv);




        spinnerCourse = findViewById(R.id.spinnerCourseSpin);
        spinnerBranch = findViewById(R.id.spinnerBranchSpin);
        spinnerSem = findViewById(R.id.spinnerSem1);
        spinnerSubject = findViewById(R.id.spinnerSubject);

        course = new ArrayList<>();
        course.add("BTECH");
        course.add("BARCH");
        course.add("BBA");

        String title = "SYLLABUS";
//        Objects.requireNonNull(getSupportActionBar()).setTitle(title);
//        getSupportActionBar().setDisplayShowTitleEnabled(true);
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.primary)));



        //setting first drop down
         adapterCourse = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , course);
         adapterCourse.setDropDownViewResource(android.R.layout.simple_spinner_item);
        adapterCourse.notifyDataSetChanged();
        spinnerCourse.setAdapter(adapterCourse);

        BTECH= new ArrayList<>();
        BTECH.add("CSE");
        BTECH.add("ECE");
        BTECH.add("IT");
        BTECH.add("EEE");
        BTECH.add("MECH");
        BTECH.add("CHEMICAL");
        BTECH.add("PRODUCTION");
        BTECH.add("BIOTECH");

        BBA = new ArrayList<>();
        BBA.add("BBA");

        BARCH = new ArrayList<>();
        BARCH.add("BARCH");



        spinnerCourse.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                selectedCourse= spinnerCourse.getSelectedItem().toString().trim()+"";
                courseSet = selectedCourse;
                if (i==0)
                {
                    adapterBranch = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , BTECH);

                }
                if (i==1)
                {
                    adapterBranch = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , BARCH);

                }
                if (i==2)
                {
                    adapterBranch = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , BBA);

                }
                adapterBranch.notifyDataSetChanged();
                spinnerBranch.setAdapter(adapterBranch);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        CSE = new ArrayList<>();
        CSE.add("SEM1");
        CSE.add("SEM2");
        CSE.add("SEM3");
        CSE.add("SEM4");
        CSE.add("SEM5");
        CSE.add("SEM6");
        CSE.add("SEM7");
        CSE.add("SEM8");

        EEE = new ArrayList<>();
        EEE.add("SEM1");
        EEE.add("SEM2");
        EEE.add("SEM3");
        EEE.add("SEM4");
        EEE.add("SEM5");
        EEE.add("SEM6");
        EEE.add("SEM7");
        EEE.add("SEM8");

        ECE = new ArrayList<>();
        ECE.add("SEM1");
        ECE.add("SEM2");
        ECE.add("SEM3");
        ECE.add("SEM4");
        ECE.add("SEM5");
        ECE.add("SEM6");
        ECE.add("SEM7");
        ECE.add("SEM8");

        IT = new ArrayList<>();
        IT.add("SEM1");
        IT.add("SEM2");
        IT.add("SEM3");
        IT.add("SEM4");
        IT.add("SEM5");
        IT.add("SEM6");
        IT.add("SEM7");
        IT.add("SEM8");

        MECH = new ArrayList<>();
        MECH.add("SEM1");
        MECH.add("SEM2");
        MECH.add("SEM3");
        MECH.add("SEM4");
        MECH.add("SEM5");
        MECH.add("SEM6");
        MECH.add("SEM7");
        MECH.add("SEM8");

        Chemical = new ArrayList<>();
        Chemical.add("SEM1");
        Chemical.add("SEM2");
        Chemical.add("SEM3");
        Chemical.add("SEM4");
        Chemical.add("SEM5");
        Chemical.add("SEM6");
        Chemical.add("SEM7");
        Chemical.add("SEM8");


        Production = new ArrayList<>();
        Production.add("SEM1");
        Production.add("SEM2");
        Production.add("SEM3");
        Production.add("SEM4");
        Production.add("SEM5");
        Production.add("SEM6");
        Production.add("SEM7");
        Production.add("SEM8");

        Biotech = new ArrayList<>();
        Biotech.add("SEM1");
        Biotech.add("SEM2");
        Biotech.add("SEM3");
        Biotech.add("SEM4");
        Biotech.add("SEM5");
        Biotech.add("SEM6");
        Biotech.add("SEM7");
        Biotech.add("SEM8");


        BARCHBranch = new ArrayList<>();
        BARCHBranch.add("SEM1");
        BARCHBranch.add("SEM2");
        BARCHBranch.add("SEM3");
        BARCHBranch.add("SEM4");
        BARCHBranch.add("SEM5");
        BARCHBranch.add("SEM6");
        BARCHBranch.add("SEM7");
        BARCHBranch.add("SEM8");
        BARCHBranch.add("SEM9");
        BARCHBranch.add("SEM10");

        spinnerBranch.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                selectedBranch = spinnerBranch.getSelectedItem().toString().trim()+"";
                branchSet = selectedBranch;
                if (selectedBranch.equalsIgnoreCase(BTECH.get(0)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSE);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(1)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSE);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(2)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSE);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(3)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSE);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(4)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , MECH);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(5)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , MECH);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(6)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , MECH);

                }
                if (selectedBranch.equalsIgnoreCase(BTECH.get(7)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , MECH);

                }
                if (selectedBranch.equalsIgnoreCase(BARCH.get(0)))
                {
                    adapterSem = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , BARCHBranch);

                }
                adapterSem.notifyDataSetChanged();
                spinnerSem.setAdapter(adapterSem);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });



        CSEsem1 = new ArrayList<>();
        CSEsem1.add("BECE");
        CSEsem1.add("Chemistry");
        CSEsem1.add("Mathematics I");
        CSEsem1.add("BME");
        CSEsem1.add("Chemistry lab");
        CSEsem1.add("Electronics and Communication lab");
        CSEsem1.add("Engineering Graphics lab");


        CSEsem2 = new ArrayList<>();
        CSEsem2.add("Mathematics II");
        CSEsem2.add("Physics");
        CSEsem2.add("Programming for problem Solving");
        CSEsem2.add("BEE");
        CSEsem2.add("Physics Lab");
        CSEsem2.add("Programming for problem Solving Lab");
        CSEsem2.add("Workshop Practice");

        ECEsem1 = new ArrayList<>();
        ECEsem1.add("BECE");
        ECEsem1.add("Chemistry");
        ECEsem1.add("Mathematics I");
        ECEsem1.add("BME");
        ECEsem1.add("Chemistry lab");
        ECEsem1.add("Electronics and Communication lab");
        ECEsem1.add("Engineering Graphics lab");


        ECEsem2 = new ArrayList<>();
        ECEsem2.add("Mathematics II");
        ECEsem2.add("Physics");
        ECEsem2.add("Programming for problem Solving");
        ECEsem2.add("BEE");
        ECEsem2.add("Physics Lab");
        ECEsem2.add("Programming for problem Solving Lab");
        ECEsem2.add("Workshop Practice");

        EEEsem1 = new ArrayList<>();
        EEEsem1.add("BECE");
        EEEsem1.add("Chemistry");
        EEEsem1.add("Mathematics I");
        EEEsem1.add("BME");
        EEEsem1.add("Chemistry lab");
        EEEsem1.add("Electronics and Communication lab");
        EEEsem1.add("Engineering Graphics lab");


        EEEsem2 = new ArrayList<>();
        EEEsem2.add("Mathematics II");
        EEEsem2.add("Physics");
        EEEsem2.add("Programming for problem Solving");
        EEEsem2.add("BEE");
        EEEsem2.add("Physics Lab");
        EEEsem2.add("Programming for problem Solving Lab");
        EEEsem2.add("Workshop Practice");

        ITsem1 = new ArrayList<>();
        ITsem1.add("BECE");
        ITsem1.add("Chemistry");
        ITsem1.add("Mathematics I");
        ITsem1.add("BME");
        ITsem1.add("Chemistry lab");
        ITsem1.add("Electronics and Communication lab");
        ITsem1.add("Engineering Graphics lab");


        ITsem2 = new ArrayList<>();
        ITsem2.add("Mathematics II");
        ITsem2.add("Physics");
        ITsem2.add("Programming for problem Solving");
        ITsem2.add("BEE");
        ITsem2.add("Physics Lab");
        ITsem2.add("Programming for problem Solving Lab");
        ITsem2.add("Workshop Practice");



        MECHsem1 = new ArrayList<>();
        MECHsem1.add("BECE");
        MECHsem1.add("Chemistry");
        MECHsem1.add("Mathematics I");
        MECHsem1.add("BME");
        MECHsem1.add("Chemistry lab");
        MECHsem1.add("Electronics and Communication lab");
        MECHsem1.add("Engineering Graphics lab");


        MECHsem2 = new ArrayList<>();
        MECHsem2.add("Mathematics II");
        MECHsem2.add("Physics");
        MECHsem2.add("Programming for problem Solving");
        MECHsem2.add("BEE");
        MECHsem2.add("Physics Lab");
        MECHsem2.add("Programming for problem Solving Lab");
        MECHsem2.add("Workshop Practice");



        Productionsem1 = new ArrayList<>();
        Productionsem1.add("BECE");
        Productionsem1.add("Chemistry");
        Productionsem1.add("Mathematics I");
        Productionsem1.add("BME");
        Productionsem1.add("Chemistry lab");
        Productionsem1.add("Electronics and Communication lab");
        Productionsem1.add("Engineering Graphics lab");


        Productionsem2 = new ArrayList<>();
        Productionsem2.add("Mathematics II");
        Productionsem2.add("Physics");
        Productionsem2.add("Programming for problem Solving");
        Productionsem2.add("BEE");
        Productionsem2.add("Physics Lab");
        Productionsem2.add("Programming for problem Solving Lab");
        Productionsem2.add("Workshop Practice");

        Biotechsem1 = new ArrayList<>();
        Biotechsem1.add("BECE");
        Biotechsem1.add("Chemistry");
        Biotechsem1.add("Mathematics I");
        Biotechsem1.add("BME");
        Biotechsem1.add("Chemistry lab");
        Biotechsem1.add("Electronics and Communication lab");
        Biotechsem1.add("Engineering Graphics lab");


        Biotechsem2 = new ArrayList<>();
        Biotechsem2.add("Mathematics II");
        Biotechsem2.add("Physics");
        Biotechsem2.add("Programming for problem Solving");
        Biotechsem2.add("BEE");
        Biotechsem2.add("Physics Lab");
        Biotechsem2.add("Programming for problem Solving Lab");
        Biotechsem2.add("Workshop Practice");


        Chemicalsem1 = new ArrayList<>();
        Chemicalsem1.add("BECE");
        Chemicalsem1.add("Chemistry");
        Chemicalsem1.add("Mathematics I");
        Chemicalsem1.add("BME");
        Chemicalsem1.add("Chemistry lab");
        Chemicalsem1.add("Electronics and Communication lab");
        Chemicalsem1.add("Engineering Graphics lab");


        Chemicalsem2 = new ArrayList<>();
        Chemicalsem2.add("Mathematics II");
        Chemicalsem2.add("Physics");
        Chemicalsem2.add("Programming for problem Solving");
        Chemicalsem2.add("BEE");
        Chemicalsem2.add("Physics Lab");
        Chemicalsem2.add("Programming for problem Solving Lab");
        Chemicalsem2.add("Workshop Practice");


              spinnerSem.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                selectedSem = spinnerSem.getSelectedItem().toString().trim()+"";
                semSet = selectedSem;
                if (selectedSem.equalsIgnoreCase(CSE.get(0)))
                {
                    adapterSubject = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSEsem1);

                }
                if (selectedSem.equalsIgnoreCase(CSE.get(1)))
                {
                    adapterSubject = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSEsem2);

                }
                if (selectedSem.equalsIgnoreCase(CSE.get(1)))
                {
                    adapterSubject = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSEsem2);

                }
                if (selectedSem.equalsIgnoreCase(CSE.get(1)))
                {
                    adapterSubject = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item , CSEsem2);

                }

                adapterSubject.notifyDataSetChanged();
                spinnerSubject.setAdapter(adapterSubject);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        spinnerSubject.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                selectedSubject = spinnerSubject.getSelectedItem().toString().trim()+"";
                subjectSet = selectedSubject;

                  }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });



        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(SyallabusActivity.this, SyllabusDetailActivity.class);
                intent.putExtra("course" , courseSet );
                intent.putExtra("branch" , branchSet );
                intent.putExtra("sem" , semSet );
                intent.putExtra("subject" , subjectSet );
                startActivity(intent);
            }
        });


    }


    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(SyallabusActivity.this , MainActivity.class);
        startActivity(intent);
        finish();
    }
}