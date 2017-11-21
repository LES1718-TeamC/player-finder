#!/usr/bin/env groovy

def notifySlack(String buildStatus = 'STARTED') {
    
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'

    def color

    if (buildStatus == 'STARTED') {
        color = '#D4DADF'
    } else if (buildStatus == 'SUCCESS') {
        color = '#BDFFC3'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFFE89'
    } else {
        color = '#FF9FA1'
    }

    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"

    slackSend(color: color, message: msg)
}

node {
    try {
        notifySlack()

        stage('checkout') {
            checkout scm
        }

        stage('check java') {
            sh "java -version"
        }

        stage('clean') {
            sh "chmod +x mvnw"
            sh "./mvnw clean"
        }

        stage('install tools') {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v6.11.3 -DyarnVersion=v1.1.0"
        }

        stage('yarn install') {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn"
        }

        stage('backend tests') {
            try {
                sh "./mvnw test"
            } catch(err) {
                throw err
            } finally {
                junit '**/target/surefire-reports/TEST-*.xml'
                step( [ $class: 'JacocoPublisher' ] )
            }
        }

        stage('frontend tests') {
            try {
                sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn -Dfrontend.yarn.arguments=test"
            } catch(err) {
                throw err
            } finally {
                junit '**/target/test-results/karma/TESTS-*.xml'
            }
        }

        stage('package and deploy') {
            
            withCredentials([[$class: 'StringBinding', credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY']]) {
            
                sh "./mvnw com.heroku.sdk:heroku-maven-plugin:1.1.1:deploy -DskipTests -Pprod -Dheroku.appName=player-finder-prod"
                archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
            }
        }
    } catch (e) {

        currentBuild.result = 'FAILURE'
        throw e

    } finally {

        notifySlack(currentBuild.result)
    }
}
