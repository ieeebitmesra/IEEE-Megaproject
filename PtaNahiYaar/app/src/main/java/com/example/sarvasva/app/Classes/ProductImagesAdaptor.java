package com.example.sarvasva.app.Classes;

import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.viewpager.widget.PagerAdapter;

import com.bumptech.glide.Glide;
import com.example.sarvasva.R;

import java.util.List;

public class ProductImagesAdaptor extends PagerAdapter {

    private List<String> list;

    public ProductImagesAdaptor(List<String> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {

        ImageView imageView = new ImageView(container.getContext());

        Glide.with(container.getContext()).load(list.get(position)).placeholder(R.drawable.sign_up).into(imageView);
        container.addView(imageView , 0);


        return imageView;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {

        container.removeView((ImageView) object);
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view==object;
    }
}
