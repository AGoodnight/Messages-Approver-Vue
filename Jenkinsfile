pipeline {
    // agent {
    //     dockerfile true
    // }
    agent any
    stages {
        // stage('download dependencies') {
        //     steps {
        //         sh 'npm ci'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         echo 'Testing Vue'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         echo 'Building Vue app'
        //         sh 'npm build'
        //     }
        // }
        stage ('Deploy') {
            steps {
                echo "Deploy Vue to S3"
                // withCredentials([[
                //     $class: 'AmazonWebServicesCredentialsBinding',
                //     credentialsId: "DetroitLabsJenkins",
                //     accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                //     secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                // ]]) {
                //     // AWS Code
                // }
                withAwsCli( region:'region-2', credentials:'DetroitLabsJenkins'){
                    sh 'echo "Uploading to s3"'
                    sh 'aws s3 ls'
                    // s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'README.md', bucket:'chaofoam-poc-bucket')
                }
            }
        }
    }
}
