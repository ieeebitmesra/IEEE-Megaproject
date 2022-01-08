package com.example.sarvasva.app.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.sarvasva.R;

public class president_edit extends Fragment {

    FragmentTransaction fragmentTransaction;
    Button Save;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_president_edit, container, false);

        Save = view.findViewById(R.id.save);
        Save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new ClubsProfile());
            }
        });

        return view;
    }

    private void changeFragment(Fragment fragment) {
        fragmentTransaction = getParentFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.fui_slide_in_right,R.anim.fui_slide_out_left);
        fragmentTransaction.replace(R.id.main_activity_frame_layout, fragment);
        fragmentTransaction.addToBackStack(null).commit();
    }
}