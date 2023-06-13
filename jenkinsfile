pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building Vue app'
                sh npm build
            }
        }
        stage('Test') {
            steps {
                echo 'Testing Vue'
            }
        }
        stage ('Deploy') {
            steps {
                echo "Deploy Vue to S3"
            }
        }
    }
}
