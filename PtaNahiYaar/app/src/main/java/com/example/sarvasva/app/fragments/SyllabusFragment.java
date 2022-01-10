package com.example.sarvasva.app.fragments;

import static android.content.ContentValues.TAG;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.example.sarvasva.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SyllabusFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SyllabusFragment extends Fragment {


    private FirebaseFirestore firestore;
    private TextView courseCodeTv , courseTitleTv , module1Tv, module5Tv, module4Tv,
            module3Tv, module2Tv , referenceBookTv , textBookTv;
    private String courseCode , courseTitle , module1, module5,
            module4, module3, module2 , referenceBook , textBook ,selectedCourse ,selectedBranch,selectedSubject , selectedSem;


    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private static final String ARG_PARAM3 = "param3";
    private static final String ARG_PARAM4 = "param4";



    public SyllabusFragment() {
        // Required empty public constructor
    }



    @NonNull
    public static SyllabusFragment newInstance(String param1, String param2 , String param3 , String param4) {
        SyllabusFragment fragment = new SyllabusFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        args.putString(ARG_PARAM3, param3);
        args.putString(ARG_PARAM4, param4);
        fragment.setArguments(args);
        return fragment;
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_syllabus, container, false);

        firestore = FirebaseFirestore.getInstance();

        courseCodeTv = view.findViewById(R.id.courseCodeTv);
        courseTitleTv = view.findViewById(R.id.courseTitleTv);
        module1Tv = view.findViewById(R.id.module1Tv);
        module2Tv = view.findViewById(R.id.module2Tv);
        module3Tv = view.findViewById(R.id.module3Tv);
        module4Tv = view.findViewById(R.id.module4Tv);
        module5Tv = view.findViewById(R.id.module5Tv);
        textBookTv = view.findViewById(R.id.textBookTv);
        referenceBookTv = view.findViewById(R.id.referenceBookTv);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        firestore = FirebaseFirestore.getInstance();

            selectedCourse = getArguments().getString(ARG_PARAM1);
            selectedBranch = getArguments().getString(ARG_PARAM2);
            selectedSem = getArguments().getString(ARG_PARAM3);
            selectedSubject = getArguments().getString(ARG_PARAM4);

//        collection("SUBJECTS")
//                .document(selectedSubject)

        firestore.collection("SYALLABUS").document(
                selectedCourse).collection("BRANCH").document(selectedBranch)
                .collection("SEMESTER").document(selectedSem).collection("SUBJECTS")
                .document(selectedSubject).get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot shot = task.getResult();
                    if (shot.exists()) {
                        Log.d(TAG, "DocumentSnapshot data: " + shot.getData());


                        module1 = (String) shot.get("MODULE1");
                        module2 = (String) shot.get("MODULE2");
                        module3 = (String) shot.get("MODULE3");
                        module4 = (String) shot.get("MODULE4");
                        module5 = (String) shot.get("MODULE5");

                        courseCode = (String) shot.get("COURSECODE");
                        courseTitle = (String) shot.get("COURSETITLE");
                        referenceBook = (String) shot.get("REFERENCEBOOK");
                        textBook = (String) shot.get("TEXTBOOK");

                        //setting the data

                        module1Tv.setText(module1);
                        module2Tv.setText(module2);
                        module3Tv.setText(module3);
                        module4Tv.setText(module4);
                        module5Tv.setText(module5);
                        courseCodeTv.setText(courseCode);
                        courseTitleTv.setText(courseTitle);
                        textBookTv.setText(textBook);
                        referenceBookTv.setText(referenceBook);

                        //end setting data


                    } else {
                        Log.d(TAG, "No such document");
                    }
                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }

            }
        });




    }
}