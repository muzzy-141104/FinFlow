# FinFlow AWS EC2 Deployment Guide

## Prerequisites
- AWS EC2 instance (Ubuntu/Amazon Linux recommended)
- SSH access to your EC2 instance
- Domain name (optional, but recommended)

## Step 1: Prepare Your Local Project

### 1.1 Update Environment Variables
Before deploying, make sure your `.env` file contains all production values:
```bash
# Your .env file should have:
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
FIREBASE_SERVICE_ACCOUNT_KEY=...
```

### 1.2 Test Docker Build Locally (Optional)
```bash
docker build -t finflow-app .
docker run -p 3000:3000 --env-file .env finflow-app
```

## Step 2: EC2 Instance Setup

### 2.1 Connect to Your EC2 Instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### 2.2 Update System Packages
```bash
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu
```

### 2.3 Install Docker
```bash
# For Amazon Linux 2023/Amazon Linux 2
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# For Ubuntu
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 2.4 Install Git
```bash
sudo yum install git -y  # Amazon Linux
# OR
sudo apt install git -y  # Ubuntu
```

### 2.5 Logout and Login Again
```bash
exit
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

## Step 3: Deploy Application

### 3.1 Clone Your Repository
```bash
cd ~
git clone https://github.com/muzzy-141104/FinFlow.git
cd FinFlow
```

### 3.2 Create Environment File
```bash
nano .env
```
Paste your environment variables, then save (Ctrl+X, Y, Enter)

### 3.3 Update Nginx Configuration
```bash
nano nginx.conf
```
Replace `your-domain.com` with your actual domain or EC2 public IP

### 3.4 Build and Run with Docker Compose
```bash
# Build and start containers
docker-compose up -d --build

# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# To stop containers
docker-compose down
```

## Step 4: Configure EC2 Security Group

### 4.1 Add Inbound Rules
Go to AWS Console → EC2 → Security Groups → Your instance's security group

Add these inbound rules:
- Type: HTTP, Port: 80, Source: 0.0.0.0/0
- Type: HTTPS, Port: 443, Source: 0.0.0.0/0
- Type: Custom TCP, Port: 3000, Source: 0.0.0.0/0 (for testing)

## Step 5: Access Your Application

Your app should now be accessible at:
- `http://your-ec2-public-ip`
- `http://your-domain.com` (if you configured DNS)

## Step 6: SSL/HTTPS Setup (Recommended)

### 6.1 Install Certbot
```bash
# Amazon Linux 2023
sudo yum install certbot python3-certbot-nginx -y

# Ubuntu
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Create SSL Directory
```bash
mkdir -p ~/FinFlow/ssl
```

### 6.3 Get SSL Certificate
```bash
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
```

### 6.4 Copy Certificates
```bash
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ~/FinFlow/ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ~/FinFlow/ssl/key.pem
sudo chown -R $USER:$USER ~/FinFlow/ssl
```

### 6.5 Update Nginx Configuration
```bash
cd ~/FinFlow
nano nginx.conf
```
Uncomment the HTTPS server block and update domain names

### 6.6 Restart Containers
```bash
docker-compose restart nginx
```

## Step 7: Firebase Configuration

### 7.1 Add EC2 IP/Domain to Firebase Authorized Domains
1. Go to Firebase Console: https://console.firebase.google.com/project/finflow-knjbt/authentication/settings
2. Navigate to: Authentication → Settings → Authorized domains
3. Add your EC2 public IP or domain name

## Useful Docker Commands

```bash
# View all containers
docker ps -a

# View logs for specific service
docker-compose logs -f finflow-app
docker-compose logs -f nginx

# Restart specific service
docker-compose restart finflow-app
docker-compose restart nginx

# Rebuild after code changes
git pull
docker-compose down
docker-compose up -d --build

# Clean up unused Docker resources
docker system prune -a

# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs finflow-app
```

### Nginx errors
```bash
docker-compose logs nginx
docker exec -it finflow-nginx nginx -t  # Test nginx config
```

### Environment variables not working
```bash
docker exec -it finflow-nextjs env | grep FIREBASE
```

### Port already in use
```bash
sudo lsof -i :80
sudo lsof -i :3000
# Kill the process if needed
sudo kill -9 <PID>
```

## Auto-Restart on Server Reboot

Docker containers will automatically restart due to `restart: unless-stopped` in docker-compose.yml

## Updating Your Application

```bash
cd ~/FinFlow
git pull
docker-compose down
docker-compose up -d --build
```

## Monitoring

### Check application health
```bash
curl http://localhost/health
```

### Monitor resource usage
```bash
docker stats
```

## Backup Strategy

### Backup environment file
```bash
cp .env .env.backup
```

### Backup Firestore (from Firebase Console)
Go to Firebase Console → Firestore → Import/Export

---

## Quick Start Commands Summary

```bash
# On EC2 instance
git clone https://github.com/muzzy-141104/FinFlow.git
cd FinFlow
nano .env  # Add environment variables
nano nginx.conf  # Update domain
docker-compose up -d --build
docker-compose logs -f
```

Your FinFlow app should now be live! 🚀
