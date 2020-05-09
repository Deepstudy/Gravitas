# Gravitas
## Description
CRUD APIS for notes
## Developer Setup
### Installing dependencies
1. Install  mysql  Ver 8.0.19 
2. Install node v12.16.1
3. In the root directory checkout package.json and run npm install to install the node modules
4. Copy `.env.example` into `.env` and and fill in the correct values.


## Code
### Project Stucture
```
└── app
    ├── config          // All configurations
    ├── constants       // Extracted out constants
    ├── controllers     // Express Controllers
   
    ├── errors          // Errors classes, including ServiceError class
    ├── interfaces      // All interfaces used are here
    ├── models          // Express Models
    ├── repositories    // Repositories
    ├── routes          // Express routes
    ├── services        // Express Services
 
```
### Code Conventions
- Files are named in `UpperCamelCase`.
- Classes and interfaces named using `UpperCamelCase`
- variables named using `lowerCamelCase`

## Mysql schemas
```
#Create user table
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `otp` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

#Create user sessions table
CREATE TABLE `user_sessions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_id` varchar(45) DEFAULT NULL,
  `device_token` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

#Create notes table
CREATE TABLE `notes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_by` int unsigned NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `label` varchar(45) DEFAULT 'general',
  `is_deleted` varchar(45) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`created_by`),
  CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```


## Things not considered
1. Unit testing , only manual done
2. Code documemtation(comments on public functions) as the functions are self explanatory
3. Validation layer for request such as ajv
4. If sevral middlewares are there they can be grouped together , right now auth middleware is written in a service.