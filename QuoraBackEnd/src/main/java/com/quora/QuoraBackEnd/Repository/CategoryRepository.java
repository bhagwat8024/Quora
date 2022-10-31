package com.quora.QuoraBackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quora.QuoraBackEnd.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
