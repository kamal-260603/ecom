pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                echo '📦 Cloning latest code from GitHub...'
                git branch: 'main', url: 'https://github.com/kamal-260603/ecom.git'
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    echo '🧩 Installing frontend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    echo '⚙️ Installing backend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Record Update Time') {
            steps {
                sh 'echo "Last updated at: $(date)" > last_update.txt'
                echo '✅ Basic Jenkins automation complete!'
            }
        }
    }
}
