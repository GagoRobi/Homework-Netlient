package hu.ugyfelkartya.netlienthomework.service;

import hu.ugyfelkartya.netlienthomework.model.Adat;
import hu.ugyfelkartya.netlienthomework.repository.AdatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdatService {
    private final AdatRepository adatRepository;

    public Page<Adat> findAll(PageRequest pageRequest){
        return adatRepository.findAll(pageRequest);
    }
}
