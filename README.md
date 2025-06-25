# Sport CRM - Fitness Management System

A comprehensive Next.js-based Customer Relationship Management (CRM) system designed specifically for fitness businesses, gyms, and sports facilities.

## 🚀 Features

### Core Functionality
- **Member Management**: Register, track, and manage member profiles with detailed information
- **Class Scheduling**: Create and manage fitness classes with booking capabilities
- **Trainer Management**: Manage trainer profiles, schedules, and performance tracking
- **CRM Functionalities**: Track memberships, payments, and customer communications
- **Event Announcements**: Send and manage announcements/news to members
- **Admin Dashboard**: Advanced analytics, reports, and system management

### Key Features
- 📊 **Real-time Analytics**: Dashboard with key metrics and performance indicators
- 👥 **Member Profiles**: Comprehensive member information and activity tracking
- 📅 **Class Booking**: Easy-to-use scheduling system for classes and sessions
- 💰 **Payment Tracking**: Monitor payments, memberships, and revenue
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- 🔐 **Role-based Access**: Different access levels for admins, trainers, and members
- 📈 **Reporting**: Generate detailed reports and analytics
- 🔔 **Notifications**: Real-time notifications and announcements

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sport-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses Prisma with the following main models:

- **User**: Base user accounts with role-based access
- **Member**: Member-specific information and profiles
- **Trainer**: Trainer profiles and specializations
- **Class**: Fitness classes and schedules
- **Booking**: Class and session bookings
- **Payment**: Payment tracking and management
- **Communication**: Member communications and announcements
- **Admin**: Administrative user management

## 📁 Project Structure

```
sport-crm/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and management
│   ├── members/           # Member management pages
│   ├── classes/           # Class scheduling pages
│   ├── trainers/          # Trainer management pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🎯 Usage

### Dashboard
- View key metrics and statistics
- Quick access to all major features
- Real-time system status

### Member Management
- Add new members with detailed profiles
- Track membership status and history
- Manage member communications

### Class Scheduling
- Create and manage fitness classes
- Set up recurring schedules
- Handle class bookings and capacity

### Trainer Management
- Manage trainer profiles and specializations
- Track trainer performance and ratings
- Handle trainer schedules and availability

### Admin Features
- System analytics and reporting
- User management and permissions
- Database backup and maintenance
- Security monitoring

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the Prisma schema for database structure

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced reporting and analytics
- [ ] Integration with payment gateways
- [ ] Email marketing automation
- [ ] Member mobile app
- [ ] Advanced scheduling features
- [ ] Multi-location support
- [ ] API for third-party integrations

---

Built with ❤️ using Next.js and modern web technologies.
