package hu.ugyfelkartya.netlienthomework.repository;

import hu.ugyfelkartya.netlienthomework.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameAndPassword(String username, String password);
    boolean existsByUsernameAndPassword(String username, String password);
}
