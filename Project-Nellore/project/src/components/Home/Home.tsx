import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  keyframes
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useLanguage } from '../../contexts/LanguageContext';

// Enhanced animations with more sophisticated timing
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3),
                0 0 30px rgba(255, 255, 255, 0.2),
                0 0 45px rgba(255, 255, 255, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.4),
                0 0 50px rgba(255, 255, 255, 0.3),
                0 0 75px rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3),
                0 0 30px rgba(255, 255, 255, 0.2),
                0 0 45px rgba(255, 255, 255, 0.1);
    transform: scale(1);
  }
`;

const iconFloat = keyframes`
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-8px) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  75% {
    transform: translateY(-8px) rotate(-5deg) scale(1.1);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
`;

const backgroundShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Enhanced styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${fadeInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  opacity: 0,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-15px) scale(1.04)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&::before': {
      transform: 'translateX(100%)',
      animation: `${shine} 1.5s infinite`,
    },
    '& .icon-wrapper': {
      animation: `${glowPulse} 2s infinite`,
      '& svg': {
        animation: `${iconFloat} 4s ease-in-out infinite`,
        filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))'
      }
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  marginBottom: theme.spacing(4),
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '& svg': {
    fontSize: '3.5rem',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))'
  }
}));

const sectors = [
  {
    id: 'shopping-malls',
    name: 'Shopping Malls',
    icon: <ShoppingCartIcon />,
    path: '/shopping-malls',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #FF6B6B 100%)'
  },
  {
    id: 'hospitals',
    name: 'Hospitals',
    icon: <LocalHospitalIcon />,
    path: '/hospitals',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #45B7D1 50%, #4ECDC4 100%)'
  },
  {
    id: 'hotels',
    name: 'Hotels',
    icon: <HotelIcon />,
    path: '/hotels',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 50%, #A78BFA 100%)'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: <RestaurantIcon />,
    path: '/restaurants',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #F472B6 100%)'
  },
  {
    id: 'clinics',
    name: 'Clinics',
    icon: <MedicalServicesIcon />,
    path: '/clinics',
    gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #34D399 100%)'
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 10,
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)',
        backgroundSize: '400% 400%',
        animation: `${backgroundShift} 20s ease infinite`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 80%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{ 
          textAlign: 'center',
          mb: 12,
          color: '#ffffff',
          fontWeight: 'bold',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
          animation: `${fadeInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          opacity: 0,
          letterSpacing: '2px',
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}
      >
        {t('home.welcome')}
      </Typography>
      <Grid container spacing={5}>
        {sectors.map((sector, index) => (
          <Grid item xs={12} sm={6} md={4} key={sector.id}>
            <StyledCard
              onClick={() => navigate(sector.path)}
              sx={{
                animationDelay: `${index * 0.25}s`,
                '& .icon-wrapper': {
                  background: sector.gradient,
                  backgroundSize: '200% 200%',
                  animation: `${backgroundShift} 10s ease infinite`
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    p: 5
                  }}
                >
                  <IconWrapper className="icon-wrapper">
                    {sector.icon}
                  </IconWrapper>
                  <Typography 
                    variant="h3" 
                    component="h2"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
                      letterSpacing: '1.5px',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    {sector.name}
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 