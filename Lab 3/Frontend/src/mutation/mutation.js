
import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation    addUser ($email: String, $password: String, $firstname: String, $lastname: String, $usertype: String, $profilepic: String){
        addUser(email: $email, password: $password, firstname: $firstname, lastname: $lastname, usertype: $usertype, profilepic: $profilepic){
            email
            error
        }
    }
`;

const addBookingMutation = gql`
    mutation addBooking ($oemail: String, $uemail: String, $arrival: String, $depart: String, $headline: String, $propertyid: String, $accommodates: Int){
        addBooking(oemail: $oemail, uemail: $uemail, arrival: $arrival, depart: $depart, headline: $headline, propertyid: $propertyid, accommodates: $accommodates){
            headline
        }
    }
`;

const updateUserMutation = gql`
    mutation updateUser ($uemail: String, $ufirstname: String, $ulastname: String, $aboutme: String, $citycountry: String, $company: String, $school: String,  $hometown: String, $phone: Int, $languages: String, $gender: String){
        updateUser(uemail: $uemail, ufirstname: $ufirstname, ulastname: $ulastname, aboutme: $aboutme, citycountry: $citycountry, company: $company, school: $school, hometown: $hometown, phone: $phone, languages: $languages, gender: $gender){
            aboutme
        }
    }
`;

export {addUserMutation,addBookingMutation,updateUserMutation};