package hu.ugyfelkartya.netlienthomework.repository;

import hu.ugyfelkartya.netlienthomework.model.entity.Adat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AdatRepository extends PagingAndSortingRepository<Adat, Long> {

    Page<Adat> findAllByNameContainingIgnoreCase(String searchText, PageRequest pageRequest);
}

