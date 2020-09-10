//package yte.intern.spring.application.managestudents.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.ManyToMany;
//import java.util.Set;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class Authority implements GrantedAuthority {
//
//	@Id
//	@GeneratedValue
//	private Long id;
//
//	@ManyToMany(mappedBy = "authorities")
//	private Set<yte.intern.spring.application.managestudents.entity.Users> users;
//
//	private String authority;
//}
