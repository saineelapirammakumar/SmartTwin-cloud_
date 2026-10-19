# SmartTwin Cloud
### Cloud-Native Digital Twin Platform for Smart City Management

## 1. Project Overview

SmartTwin Cloud is a smart city monitoring platform designed to provide a centralized view of important urban parameters. It uses a digital twin approach to represent city conditions through simulated sensor readings and an interactive dashboard.

The platform is designed to support monitoring of traffic congestion, air quality, water levels, waste management, temperature, humidity, and energy usage. It aims to help users understand urban conditions and support data-driven decision-making.

**Note:** The current project uses simulated sensor readings. Real IoT sensor integration and cloud deployment are future enhancements.

## 2. Key Features

- Centralized smart city monitoring dashboard
- Simulated sensor readings for demonstration
- Traffic congestion monitoring
- Air quality monitoring
- Water and waste monitoring
- Temperature and humidity monitoring
- Energy monitoring
- Backend APIs for dashboard data
- Historical data and alert management, where implemented
- Local database storage
- Planned cloud storage and deployment using AWS

## 3. Technologies Used

| Component | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite |
| API communication | HTTP REST APIs |
| File storage | Local storage; Amazon S3 planned |
| Cloud deployment | AWS EC2 planned |
| Development environment | Visual Studio Code |

## 4. System Architecture

The system follows a frontend–backend architecture.

1. **Frontend:** The React and Vite application displays the smart city dashboard and monitoring information.
2. **Backend:** FastAPI provides endpoints for retrieving and managing application data.
3. **Simulation:** The simulator generates sample sensor readings for demonstration.
4. **Database:** SQLite stores application data locally.
5. **Cloud extension:** AWS EC2 and Amazon S3 are planned for future backend hosting and file storage.

The frontend communicates with the backend through API requests. The backend processes requests and accesses the configured database.

## 5. Project Structure

The repository contains the frontend application, backend application, and project documentation.

```text
SmartTwin-Cloud/
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
├── Backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── simulator.py
│   │   ├── services.py
│   │   ├── queries.py
│   │   └── routes/
│   ├── scripts/
│   ├── docs/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── README.md
└── SmartTwin_Cloud_Project_Report.pdf
```

*The exact files and folders may vary depending on the uploaded project version.*

## 6. Database

SmartTwin Cloud currently uses **SQLite**, a lightweight relational database that stores data in a local database file.

The database supports the storage of application information such as locations, sensors, readings, and alerts, depending on the configured models.

SQLite is suitable for local development and student demonstrations because it does not require a separate database server.

PostgreSQL is not required for the current SQLite configuration.

## 7. Simulated Sensor Data

The application uses simulated sensor readings to demonstrate smart city monitoring features.

Simulated readings allow the dashboard to display sample urban conditions without requiring physical IoT devices. These values are intended for demonstration and should not be interpreted as real-time measurements of actual city conditions.

Real sensor integration can be added in a future version.

## 8. Installation and Setup

### Prerequisites

Install the following software:

- Python
- Node.js and npm
- Visual Studio Code

### A. Start the Backend

Open a terminal and navigate to the `Backend` folder.

Create a Python virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

If the project requires environment configuration, copy `.env.example` to `.env` and configure the SQLite database path and other required settings. Do not upload `.env` files containing secrets to GitHub.

Initialize the database if required by the application:

```powershell
python -m app.init_db
```

Start the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload --port 8001
```

If your application is configured to use another port, use that configured port instead.

Useful local endpoints, when the backend is running on port 8001:

- Health check: http://localhost:8001/health
- Interactive API documentation: http://localhost:8001/docs

### B. Start the Frontend

Open a second terminal and navigate to the `Frontend` folder.

Install the dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the local URL displayed in the terminal, typically:

http://localhost:5174

Ensure the frontend API configuration points to the backend's actual address and port.

## 9. API Documentation

FastAPI provides interactive API documentation at `/docs` while the backend is running.

Depending on the routes implemented in the current version, the API may support operations for:

- Application health and system status
- Dashboard summaries
- City and zone information
- Sensor information and readings
- Historical data
- Alerts and thresholds
- File uploads and retrieval

The Swagger interface lists the endpoints actually registered by the running application.

## 10. Cloud Integration and Future Deployment

AWS integration is planned to extend the application beyond local development.

### Amazon EC2

Amazon EC2 can host the FastAPI backend on a cloud server, allowing users to access the application without running the backend on a personal computer.

### Amazon S3

Amazon S3 can be used for cloud-based file storage. The application can be extended to store uploaded files in a private bucket.

### Future deployment steps

1. Configure the AWS account and billing alerts.
2. Create and configure an EC2 instance.
3. Configure the required application dependencies and database.
4. Set up secure network access.
5. Configure a private S3 bucket if file storage is required.
6. Test the deployed backend and frontend integration.

**Current status:** AWS EC2 deployment and S3 integration are planned enhancements and should only be described as implemented after they have been configured and tested.

## 11. Security Considerations

- Do not commit `.env` files containing credentials or secrets.
- Keep `.env.example` free of real passwords and API keys.
- Do not upload private database files or sensitive user information.
- Restrict access to cloud resources if AWS deployment is introduced.
- Add authentication and authorization before exposing the application for public use.
- Validate inputs and configure appropriate CORS policies.
- Back up important data before performing database reset operations.

## 12. Limitations

- Sensor readings are simulated rather than collected from real IoT devices.
- The current database is locally configured using SQLite.
- Cloud deployment and AWS storage are future enhancements unless independently deployed and verified.
- Dashboard accuracy depends on the data available to the application.
- Authentication and other production security measures may require further development.

## 13. Future Enhancements

- Integration with real IoT sensors
- Deployment of the backend on AWS EC2
- Cloud file storage using Amazon S3
- Predictive analytics for urban conditions
- Automated alerts for unusual readings
- Improved historical analysis and reporting
- Interactive two-dimensional or three-dimensional digital twin visualization
- Stronger authentication, access control, and security

## 14. Project Report

The detailed project documentation, methodology, implementation, results, screenshots, conclusion, and references are provided in the PDF report included in this repository.

## 15. Conclusion

SmartTwin Cloud demonstrates how a web-based digital twin platform can organize simulated smart city data and present it through a centralized monitoring dashboard. The project establishes a foundation for future integration of real sensor data, predictive analytics, and cloud infrastructure.

The current implementation focuses on local development, simulated readings, and SQLite-based storage. Real IoT integration and AWS deployment remain potential future extensions.
