<!-- about.vue -->
<template>
    <v-container class="about-page">
      <v-row class="d-flex justify-center mt-5">
        <v-col cols="12" md="8">
          <v-card>
            <v-img
              src="public/about.jpg"
              alt="Your Image"
              height="200px"
            />
            <v-card-title>
                <v-icon class="mr-2">mdi-account</v-icon> 
                About Me And This Website
            </v-card-title>
            <v-card-text>
              <p>Hi, I'm Edge, a passionate software developer with a keen interest in frontend and backend technologies. I enjoy working with Vue.js, Nuxt.js, and other modern web technologies. My goal is to create beautiful and functional applications that provide value to users.</p>
              <p>In my free time, I love exploring new programming languages, contributing to open-source projects, and staying up-to-date with the latest trends in the tech industry.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                outlined
                href="https://github.com/Cthaat"
                target="_blank"
              >
                Visit my GitHub
              </v-btn>
              <v-btn
                color="secondary"
                outlined
                target="_blank"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=edge27452696803@gmail.com"
              >
                Contact Me
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  .about-page {
    background-color: #121212;
    color: white;
    min-height: 100vh;
  }
  
  v-card {
    background-color: #1e1e1e;
  }
  
  v-btn {
    color: white;
  }
  </style>
  