package com.example.sarvasva.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.activity.OnBackPressedCallback;
import androidx.fragment.app.Fragment;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.sarvasva.R;
import com.example.sarvasva.app.activities.AuthenticationActivity;
import com.example.sarvasva.app.activities.GoogleMapsInSarvasva;
import com.example.sarvasva.app.activities.MainActivity;

public class WebVliewERP extends Fragment {


    public WebView mWebView;



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {




        View v=inflater.inflate(R.layout.activity_web_viiew_erp, container, false);
        mWebView = (WebView) v.findViewById(R.id.webviewERP);
        mWebView.loadUrl("https://erp.bitmesra.ac.in/iitmsv4eGq0RuNHb0G5WbhLmTKLmTO7YBcJ4RHuXxCNPvuIw=?enc=EGbCGWnlHNJ/WdgJnKH8DA==");

        // Enable Javascript
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // Force links and redirects to open in the WebView instead of in a browser
        mWebView.setWebViewClient(new WebViewClient());

        OnBackPressedCallback callback = new OnBackPressedCallback(true /* enabled by default */) {
            @Override
            public void handleOnBackPressed() {
                // Handle the back button event
                Intent intent = new Intent(getContext() , MainActivity.class);
                startActivity(intent);
                getActivity().finish();

            }
        };
        requireActivity().getOnBackPressedDispatcher().addCallback(getActivity(), callback);

        return v;
    }


}