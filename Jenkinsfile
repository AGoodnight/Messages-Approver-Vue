pipeline {
    agent { 
        docker{
            image 'node:latest'
        }
    }
    stages {
        stage('Check for vulnerabilities') {
            steps {
                sh 'npm audit --parseable --production'
                sh 'npm outdated || exit 0'
            }
        }
        stage('download dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Check linting') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing Vue'
            }
        }
        stage('Build') {
            steps {
                echo 'Building Vue app'
                sh 'npm build'
            }
        }
        stage ('Deploy') {
            steps {
                echo "Deploy Vue to S3"
                withAWS( region:'region-2', credentials:'DetroitLabsJenkins'){
                    sh 'echo "Uploading to s3"'
                    s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'README.md', bucket:'chaofoam-poc-bucket')
                }
            }
        }
    }
}
