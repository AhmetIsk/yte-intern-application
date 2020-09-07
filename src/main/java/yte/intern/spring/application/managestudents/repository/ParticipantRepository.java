package yte.intern.spring.application.managestudents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.application.managestudents.entity.Participant;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    /**
     * Burada doğrudan Participant nesnesini dönmek yerine Optional denen bir yapı dönüyorum. Optional dediğimiz şey
     * Schrödinger'in kedisi gibi, içerisinde bir değer olabilir de olmayabilir de :) İçerisindeki bazı anlamlı methodlar
     * ile bir nesnenin olmayışı durumunu null dönmekten daha rahat ifade edebiliyor isPresent, isEmtpry gibi methodları,
     * artı orElse, orElseGet, orElseThrow gibi içerisinde bir değerin olmadığı durumlarda da çok güzel bize functional
     * bir yönetim sağlıyor. Optional'lar Java 8 ile beraber geldi ve kullanımları hala çok yaygın değil.
     * Nasıl daha detaylı kullanabileceğinize dair bilgiyi buradan alabilirsiniz: <l>https://www.baeldung.com/java-optional</l>
     */
}