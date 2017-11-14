#!/usr/bin/env groovy

node {
    stage('checkout') {
        sh "whoami"
        checkout scm
    }

    docker.image('openjdk:8').inside('-u root -e MAVEN_OPTS="-Duser.home=./" --privileged -e USER=jenkins') {
        stage('check java') {
            sh "whoami"
            sh "java -version"
        }

        stage('install sudo') {
            sh "apt-get update"
            sh "apt-get install -y sudo"
        }
        
        stage('clean') {
            sh "chmod +x mvnw"
            sh "sudo ./mvnw clean"
        }
        
        stage('install tools') {
            sh "sudo ./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v6.11.3 -DnpmVersion=5.4.2"
        }

        stage('npm install') {
            sh "sudo ./mvnw com.github.eirslett:frontend-maven-plugin:npm"
        }

       stage('backend tests') {
            try {
                sh "sudo ./mvnw test"
            } catch(err) {
                throw err
            } finally {
                junit '**/target/surefire-reports/TEST-*.xml'
            }
        }
        
        stage('package and deploy') {
            sh "sudo ./mvnw com.heroku.sdk:heroku-maven-plugin:1.1.1:deploy -DskipTests -Pprod -Dheroku.appName=player-finder"
            archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
        }

    }
}
