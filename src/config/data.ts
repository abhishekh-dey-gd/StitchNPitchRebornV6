// Configuration for Stitch and Pitch Contest
// Easily modify guides, departments, passwords, and other settings here

export interface Guide {
  id: number;
  name: string;
  department: string;
  supervisor: string;
}

export interface Winner {
  id?: string;
  guide_id: number;
  name: string;
  department: string;
  supervisor: string;
  timestamp: string;
  chat_ids?: string[];
}

export interface Loser {
  id?: string;
  guide_id: number;
  name: string;
  department: string;
  supervisor: string;
  timestamp: string;
  chat_ids?: string[];
}

export interface EliteSpiral {
  id?: string;
  winner_id: string;
  guide_id: number;
  name: string;
  department: string;
  supervisor: string;
  timestamp: string;
  chat_ids?: string[];
}

// ==========================================
// CONFIGURATION - EDIT THESE VALUES
// ==========================================

// Password for marking guides as Pass/Fail
// export const ADMIN_PASSWORD = "InternationalMessaging@20"; // Moved to login system

// Password for purging winners (can be same or different)
export const PURGE_PASSWORD = "InternationalMessaging@20";

// List of all guides participating in the contest
// Add as many departments and guides as needed
export const GUIDES: Guide[] = [
  // Abdul Rahman - General
  {
    id: 1,
    name: "Danny Polepaka",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 2,
    name: "Kusuma Manasa",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 3,
    name: "Kondamedi Nithin",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 4,
    name: "Likhitha Nalke",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 5,
    name: "Bharath Nalla",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 6,
    name: "Pavan Kalyan Bolla",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 7,
    name: "Uppunuthula Harikumar ",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 8,
    name: "Shravya Nerella",
    department: "General",
    supervisor: "Abdul Rahman"
  },
   {
    id: 9,
    name: "Sanjana Sry Akkati",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 10,
    name: "Shivani Akkapelli",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 11,
    name: "ETYALA PRASAD ",
    department: "General",
    supervisor: "Abdul Rahman"
  },
  {
    id: 12,
    name: "Vagdevi Dasari",
    department: "General",
    supervisor: "Abdul Rahman"
  },
   {
    id: 13,
    name: "Raghunayakula Sushmitha",
    department: "General",
    supervisor: "Abdul Rahman"
  },  

  // Abdul Rahman Hosting
  {
    id: 14,
    name: "Manisha Thakur",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 15,
    name: "Nikhil Ramagiri",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 16,
    name: "Alli Uday Kiran",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 17,
    name: "Rajkumar Dhude",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 18,
    name: "Swetha Santhpale",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 19,
    name: "Shalini Lingala",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 20,
    name: "Garidepalli Thriveni",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 21,
    name: "Nallamala Srujan",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
    {
    id: 22,
    name: "Shruthi Bairi",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 23,
    name: "Murali krishna Bantu",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 24,
    name: "Mounika  Gadeela",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 25,
    name: "Veldi Vijay Kumar",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },
  {
    id: 26,
    name: "Samreen Begum",
    department: "Hosting",
    supervisor: "Abdul Rahman"
  },

  // Palem - General
  {
    id: 27,
    name: "Kolariya Sharma",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 28,
    name: "Manasa Patra",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 29,
    name: "Mitra, Somnath",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 30,
    name: "Satla Vinay",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 31,
    name: "Chandrashekhar Nanneboina",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 32,
    name: "SAGANTI NIKHITHA",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 33,
    name: "Ameena Tabassum",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 34,
    name: "Varsha sree Narra",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 35,
    name: "Soumya Muppidi",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 36,
    name: "Jella Tharun",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 37,
    name: "Pasha Mohd Moulana",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 38,
    name: "Bhargavi Macherla",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 39,
    name: "Loukya Deshaboina",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 40,
    name: "Reena Aerrabelly",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 41,
    name: "Sujeeth Pranay Jannu",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 42,
    name: "Vennela Karjugutha",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 43,
    name: "Syed Parvez",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 44,
    name: "Pawan Kumar, Perapaka Jyothier Venkata",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 45,
    name: "Veenanjali Kodam",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 46,
    name: "Jyothika Mudupathula",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  {
    id: 47,
    name: "Mohith Chaturvedula",
    department: "General",
    supervisor: "Chandrasekhar Palem"
  },
  
  // Kalyan - Hosting
  {
    id: 48,
    name: "Syed Ala Uddin",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 49,
    name: "Sayed Basha",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 50,
    name: "Deepthi Pathuri",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 51,
    name: "P Pavan Kalyan",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 52,
    name: "Sanjay Kumar Sahu",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 53,
    name: "Rathod Suraj Naik",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 54,
    name: "Konduri  Gayathri",
    department: "Hosting",
    supervisor: "Kalyan Chetty"
  },  

  // Kalyan - Billing
  {
    id: 55,
    name: "Christy Golkonda",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  }, 
  {
    id: 56,
    name: "Sri, Koppula Bhanu",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 57,
    name: "Neerati Druvitha",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 58,
    name: "Tarun Namala",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 59,
    name: "Navya Vanga",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 60,
    name: "Prasanna Machha",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 61,
    name: "Mohammed Faiz Uddin",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 62,
    name: "KARTHIK AKARAPU ",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 63,
    name: "Venkatesh R",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 64,
    name: "Srikanth B",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 65,
    name: "Mohammad shahriyar Hussain",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 66,
    name: "Sai Shashank K",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 67,
    name: "Pavankalyan Bajanthri ",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 68,
    name: "Yaswik Lebaka ",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 69,
    name: "Indraganti Sridhar",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 70,
    name: "Sharvani, Kodari",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },
  {
    id: 71,
    name: "Keshav, Manda",
    department: "Billing",
    supervisor: "Kalyan Chetty"
  },

  // Prashanth - General
  {
    id: 72,
    name: "chevva sai preetham",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 73,
    name: "Vyjayanthi Kothapally",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 74,
    name: "Mounika, Mittapelli",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 75,
    name: "Veeramreddy venkata sai kumar reddy",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 76,
    name: "Kotagiri  Sai Raj",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 77,
    name: "Swathi, Botha",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 78,
    name: "Gopina  Nikhil",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 79,
    name: "Gudipati Sreelatha",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 80,
    name: "Nookala Naga Naveen",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 81,
    name: "Manikanta",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 82,
    name: "Sirikonda Raghu",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 83,
    name: "Prashanth Arukala",
    department: "General",
    supervisor: "Prashanth G C"
  },
  {
    id: 84,
    name: "Vemula Bhanuja",
    department: "General",
    supervisor: "Prashanth G C"
  },

  // Sangeeta - Sales
  {
    id: 85,
    name: "Vamshi Dulam",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 86,
    name: "Lokesh Beerukuri",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 87,
    name: "Zulkhar  Nain",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 88,
    name: "Pawar  Swathi",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 89,
    name: "Mohammad Ameeruddin",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 90,
    name: "Sowjanya byroju",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 91,
    name: "Kadire Ashwini",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 92,
    name: "Narikedamilli Sunil",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 93,
    name: "Nikhitha Palbettu",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 94,
    name: "Nikitha Roy",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 95,
    name: "Akshita Yerram",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 96,
    name: "Karumanchi Sandeep Raju",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 97,
    name: "Ankith Kumar",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 98,
    name: "Halli Santhosh",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 99,
    name: "Bandari Vinay Kumar",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 100,
    name: "Patnala Sai Priyanka",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 101,
    name: "PEDARI SAI SANDEEP",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },
  {
    id: 102,
    name: "Akanacheti Anil Kumar",
    department: "Sales",
    supervisor: "Sangeeta Bhuyan"
  },

  // Sanjo - Sales
  {
    id: 103,
    name: "Abhishek Kavishwar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 104,
    name: "Gandam Akhila",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 105,
    name: "Boda Akhila",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 106,
    name: "Kavya Deshagani",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 107,
    name: "Batthula Jhansi",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 108,
    name: "Satya Kandi",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 109,
    name: "Jadhav Sushanth",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 110,
    name: "Akanksha Bolishetti ",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 111,
    name: "Chinthakunta Laxmi prasanna",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 112,
    name: "Jonnagiri Anil Kumar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 113,
    name: "Ravi Kumar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 114,
    name: "Naga Teja Amudha ",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 115,
    name: "Manisha Sanigaram",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 116,
    name: "Medari Sowmya",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 117,
    name: "Nikhil Ramesh Munjamwar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 118,
    name: "sneha kotturi",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 119,
    name: "Varaprasad Balla",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 120,
    name: "Kuntraji Nikhitha",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 121,
    name: "Chandu Pruthvi Kumar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 122,
    name: "Mallikarjun Punnala",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 123,
    name: "Vallakati Kranthi kumar",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
  {
    id: 124,
    name: "Javvaji Manikumar Reddy",
    department: "Sales",
    supervisor: "Sanjo Jose"
  },
// Shoaib - Productivity
   {
    id: 125,
    name: "Relli Rama Naga Sai Pavan Kumar",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 126,
    name: "Varganti Ramya",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 127,
    name: "Musari Akanksha",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 128,
    name: "K AVINASH",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
   {
    id: 129,
    name: "Karthik Jakka",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 130,
    name: "Shaik Basha",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 131,
    name: "Lokesh yadav seemala",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 132,
    name: "Aravindhan Elumalai",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 133,
    name: "Pulkaram Vara prasad",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 134,
    name: "Saneem Sultan",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
   {
    id: 135,
    name: "Mohammed Naseer",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 136,
    name: "ARIGELA DOSHNA KOUSALYA",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 137,
    name: "Sudama Prasad  Yadav",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 138,
    name: "Syed. Saleem  Syed. Mubeen",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 139,
    name: "Sriram Manchikanti ",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 140,
    name: "Arvind Bandari",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 141,
    name: "Rithika Sambatha",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 142,
    name: "Poojitha Sunkari ",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 143,
    name: "Gayathri Chennoju ",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 144,
    name: "Shiva G",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 145,
    name: "Muddasir Mohd ",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 146,
    name: "Nithish Kumar Ellendhula ",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 147,
    name: "Vanka sugandham",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 148,
    name: "Panugulla Kumar Goud",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 149,
    name: "Bhargavi Killada",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  {
    id: 150,
    name: "Manasa,Pasunuti",
    department: "Productivity",
    supervisor: "Shaik Shoaib"
  },
  // Janga Srikanth - Hosting
  {
    id: 151,
    name: "Shiva Kasula",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 152,
    name: "Ayesha  Siddiqua",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 153,
    name: "Aleem Uddin  Qureshi",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 154,
    name: "Maru  Sharath Reddy",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 155,
    name: "Vangeti Divakar Reddy",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 156,
    name: "Asma Tabassum",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 157,
    name: "Dipranjan  Handique",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 158,
    name: "Dhanraj  J S",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 159,
    name: "Kasireddy Rohith  Reddy",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 160,
    name: "Mir Riyasath Ali Khan",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 161,
    name: "Sahaja  Katrimala",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 162,
    name: "Abid Ahmed",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
   {
    id: 163,
    name: "Singasani Arun",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 164,
    name: "Mir Ahmed  Ali",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 165,
    name: "N sridar",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 166,
    name: "Ahmed  Habeeb",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 167,
    name: "Syed  Adeeb",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
   {
    id: 168,
    name: "Kondapaka Deepika",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 169,
    name: "Uppula Manasa",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },
  {
    id: 170,
    name: "Mohammad Irfan",
    department: "Hosting",
    supervisor: "Srikanth Janga"
  },

  //APAC Start
{
  id: 171,
  name: "Kumar, Cheruku Ajay",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 172,
  name: "Yadav Akanksha",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 173,
  name: "Anjana, Sika",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 174,
  name: "Gupta, Anuradha",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 175,
  name: "Vaishnavi, Kuruva",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 176,
  name: "Azam, Mohammed",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 177,
  name: "Pravalika, Bandi Sai",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 178,
  name: "BEGUM, ARSHIYA",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 179,
  name: "Begum, Shaheen",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 180,
  name: "Anupriya, Bingi",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 181,
  name: "Mamatha, Boddu",
  department: "Apac-General",
  supervisor: "Sunitha"
},
{
  id: 182,
  name: "Srihari, Kadamanchi",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 183,
  name: "Chandana, Boddu",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 184,
  name: "Malathi, Chellarapu",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 185,
  name: "Radhika, Chidhurala",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 186,
  name: "Santosh Kumar, Kankurthi",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 187,
  name: "Swarna, Chintha",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 188,
  name: "Aslam, Mohammad",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 189,
  name: "Nivas, Adepu",
  department: "Apac-General",
  supervisor: "Sunitha"
},
{
  id: 190,
  name: "Yamini, Gumreddy",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 191,
  name: "Nusrath, Faiza",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 192,
  name: "Fathima, Zoya",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 193,
  name: "Fatima, Kaneez",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 194,
  name: "Divya Sree, Gaja",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 195,
  name: "Prakash, Bolle",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 196,
  name: "Saiteja, Goli",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 197,
  name: "Rajinikanth, Gouni",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 198,
  name: "Shirley, Godi laveena",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 199,
  name: "Sharanya, Gurram Sai",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 200,
  name: "Yadav, Ithan Sai Kiran",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 201,
  name: "Basith, Erukulangara",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 202,
  name: "Adarsh, Kanchi",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 203,
  name: "Akhil Kumar, Kandukuri",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 204,
  name: "Yadav, Yashasvini",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 205,
  name: "Anirudh, Kanukuntla",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 206,
  name: "Khaleel uddin, Mohammed",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 207,
  name: "Khan, P Jaber Khan",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 208,
  name: "Samyuktha, Kodakandla",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 209,
  name: "Bhavishya, Kore",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 210,
  name: "Sai Krishna, Janugani",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 211,
  name: "Dinesh, Kukunuru Sai",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 212,
  name: "Kulsum, Sheema",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 213,
  name: "Ashfaaq, Mohammed",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 214,
  name: "Sanjeev, Voliga",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 215,
  name: "Vasavya, Lingam",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 216,
  name: "Madhuri, Chimmani",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 217,
  name: "Tejaswi, Matta",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 218,
  name: "Mazharuddin, Mohammad",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 219,
  name: "RAHAMAN, MD",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 220,
  name: "Anvesh, Mittapally",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 221,
  name: "Salman, Mohammad",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 222,
  name: "Siddiq, Mohd",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 223,
  name: "Baseeruddin, Mohammed",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 224,
  name: "Mohd, Azeem Uddin",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 225,
  name: "Sana Muskan",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 226,
  name: "Sai, Nagabelly Arun",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 227,
  name: "Eshwar, Nallamala",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 228,
  name: "Kumar, Nampally Sanay",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 229,
  name: "Varshithasri, Nampally",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 230,
  name: "Varshitha, Narmeta",
  department: "Apac-General",
  supervisor: "Kumar"
},
{
  id: 231,
  name: "Akshaykumar, Nellore John",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 232,
  name: "Chandana, Thallapelli",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 233,
  name: "Ramu, Padala",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 234,
  name: "Kumar, Palla Rithish",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 235,
  name: "Pedduri, Mamatha",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 236,
  name: "Arun, Potlapelli",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 237,
  name: "P Rajeev, Alex",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 238,
  name: "Rajesh, Pothuraju",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 239,
  name: "Shreyas, Ramagiri",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 240,
  name: "Bhargavi, Ramneni",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 241,
  name: "RAVALIKA, GOLLAPELLY",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 242,
  name: "Reshma, Kannam",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 243,
  name: "BHARATH, ROUTHU",
  department: "Apac-General",
  supervisor: "Sunitha"
},
{
  id: 244,
  name: "Sadiq, Muhammad",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 245,
  name: "Sahu, Vivek Anand",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 246,
  name: "Poojitha, Samudrala",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 247,
  name: "Raviteja, Sayiri Sai",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 248,
  name: "Rahamatulla, Shaik",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 249,
  name: "Sree, B Usha",
  department: "Apac-General",
  supervisor: "Vincy"
},
{
  id: 250,
  name: "Dasari lalitha",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 251,
  name: "Sravani, Pittala",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 252,
  name: "Sravanthi, Lakavath",
  department: "Apac-General",
  supervisor: "Sangeetha"
},
{
  id: 253,
  name: "Navya Sree, Madgula",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 254,
  name: "Kruthima Goud, Chirra",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 255,
  name: "Pivahal, Srinu",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 256,
  name: "ALEEM, SK",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 257,
  name: "Saiteja, Turupathi",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 258,
  name: "Urmaliya, Neelesh",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 259,
  name: "Anjali, Vaddepally",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 260,
  name: "Chandana, Vangala",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 261,
  name: "Moinuddin, Fahad",
  department: "Apac-All Support",
  supervisor: "Sunitha"
},
{
  id: 262,
  name: "Sai, Chintala Sai Sree",
  department: "Apac-All Support",
  supervisor: "Sangeetha"
},
{
  id: 263,
  name: "Vodapally, Sai Sree",
  department: "Apac-All Support",
  supervisor: "Kumar"
},
{
  id: 264,
  name: "Rupa, Vanguri Sai",
  department: "Apac-All Support",
  supervisor: "Vincy"
},
{
  id: 265,
  name: "Vishwajith Sah, Shikari",
  department: "Apac-General",
  supervisor: "Kumar"
}
  //APAC END
];

// Get unique departments from guides list
export const DEPARTMENTS = [...new Set(GUIDES.map(guide => guide.department))].sort();

// Get guides by department
export const getGuidesByDepartment = (department: string): Guide[] => {
  return GUIDES.filter(guide => guide.department === department);
};

// Contest settings
export const CONTEST_CONFIG = {
  title: "Stitch and Pitch",
  subtitle: "Annual Guide Selection Contest",
  totalGuides: GUIDES.length,
  totalDepartments: DEPARTMENTS.length
};