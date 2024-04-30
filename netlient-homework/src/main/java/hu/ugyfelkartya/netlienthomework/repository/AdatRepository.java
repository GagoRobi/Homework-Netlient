package hu.ugyfelkartya.netlienthomework.repository;

import hu.ugyfelkartya.netlienthomework.model.Adat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface AdatRepository extends PagingAndSortingRepository<Adat, Long> {

}
