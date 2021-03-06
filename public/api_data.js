define({ "api": [
  {
    "type": "post",
    "url": "https://<url>:<port>/api/function1/",
    "title": "function1",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "loginJWT",
            "description": "<p>http-only cookie for session tracking</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Set-cookie",
          "content": "{\n    \"loginJWT\":\"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "API",
    "name": "function1",
    "version": "0.1.0",
    "description": "<p>Sample function to test JWT and session tracking</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "payload",
            "description": "<p>sample payload</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"payload\":\"sample payload value\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>login message containing username of user calling api</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "postedPayload",
            "description": "<p>the payload sent over to api in initial call</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"msg\": \"Welcome <username>!\",\n  \"postedPayload\": \"sample payload value\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden Error\n{\n  \"msg\":\"token has expired\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden Error\n{\n  \"msg\":\"Your token is invalid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "https://<url>:<port>/auth/generateToken/",
    "title": "Generate Token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "loginJWT",
            "description": "<p>http-only cookie for session tracking</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Set-cookie",
          "content": "{\n    \"loginJWT\":\"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Authentication",
    "name": "Generate_Token",
    "version": "0.1.0",
    "description": "<p>Generates JWT Token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "payload",
            "description": "<p>payload to be used in JWT generation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"payload\":\"sample payload\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "output",
            "description": "<p>Generated JWT</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"output\": \"sampleJWTvalue\",\n  \"msg\": \"Token generation success\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "https://<url>:<port>/auth/login/",
    "title": "login",
    "group": "Authentication",
    "name": "Login",
    "version": "0.1.0",
    "description": "<p>Login with username and password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p>username for new account</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>password for new account</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\":\"sampleUsername\",\n    \"password\":\"examplePassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "response",
            "description": "<p>server response</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "token",
            "description": "<p>JWT issued upon successful login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": true,\n  \"msg\": \"login success\",\n  \"token\":\"sampleJWTvalue\"\n}",
          "type": "json"
        },
        {
          "title": "Failure-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": false,\n  \"msg\": \"wrong password\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "https://<url>:<port>/auth/verifyToken/",
    "title": "Verify Token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "loginJWT",
            "description": "<p>http-only cookie for session tracking</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Set-cookie",
          "content": "{\n    \"loginJWT\":\"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Authentication",
    "name": "Verify_Token",
    "version": "0.1.0",
    "description": "<p>Verify generated JWT Token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "payload",
            "description": "<p>jwt token value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"payload\":\"encodedSampleJWTTokenValue\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "output",
            "description": "<p>Decoded JWT value</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"msg\": \"Token verification success\"   \n  \"output\":{\n    \"payload\": \"decodedSampleJWTTokenValue\",\n    \"iat\": 1591882089,\n    \"exp\": 1591968489\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"msg\": \"Token verification fail\"   \n  \"output\":{\n    \"name\": \"TokenExpiredError\",\n     \"message\": \"jwt expired\",\n     \"expiredAt\": \"2020-05-28T10:06:05.000Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "https://<url>:<port>/auth/logout/",
    "title": "logout",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "loginJWT",
            "description": "<p>http-only cookie for session tracking</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Set-cookie",
          "content": "{\n    \"loginJWT\":\"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Authentication",
    "name": "logout",
    "version": "0.1.0",
    "description": "<p>Performs logout</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p>username for new account</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\":\"sampleUsername\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "response",
            "description": "<p>server response</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": true,\n  \"msg\": \"cookies cleared\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "https://<url>:<port>/auth/register/",
    "title": "register",
    "group": "Authentication",
    "name": "register",
    "version": "0.1.0",
    "description": "<p>Register user account function</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p>username for new account</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>password for new account</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\":\"sampleUsername\",\n    \"password\":\"examplePassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "response",
            "description": "<p>server response</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": true,\n  \"msg\": \"user has been registered successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "response",
            "description": "<p>server response</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>More detailed server response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden Error\n{\n  \"response\": false,\n  \"msg\": \"user is already registered\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server_components/routes/authentication.js",
    "groupTitle": "Authentication"
  }
] });
