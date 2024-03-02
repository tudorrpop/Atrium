package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Professor;
import ro.upt.atrium.model.Student;
import ro.upt.atrium.model.User;
import ro.upt.atrium.repository.ProfessorRepository;
import ro.upt.atrium.repository.StudentRepository;

@Service
public class UserService {

    @Autowired
    private final StudentRepository studentRepository;
    @Autowired
    private final ProfessorRepository professorRepository;

    @Autowired
    public UserService(StudentRepository studentRepository, ProfessorRepository professorRepository){
        this.studentRepository = studentRepository;
        this.professorRepository= professorRepository;
    }

    public User getUser(String email){

        if (email.contains("student"))
            return studentRepository.findByEmail(email);
        return professorRepository.findByEmail(email);
    }

    public User saveUser(User user){
        if (user instanceof Student) {
            return studentRepository.save((Student) user);
        } else if (user instanceof Professor) {
            return professorRepository.save((Professor) user);
        }
        return null;
    }

}
