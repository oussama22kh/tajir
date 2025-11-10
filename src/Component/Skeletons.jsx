import { Skeleton, Box, Grid } from '@mui/material';

/**
 * Product card skeleton loader
 */
export const ProductCardSkeleton = () => (
  <Box sx={{ p: 2, mb: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Box>
);

/**
 * Grid of product skeletons
 */
export const ProductGridSkeleton = ({ count = 6 }) => (
  <Grid container spacing={2} sx={{ p: 2 }}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <ProductCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

/**
 * Category button skeleton
 */
export const CategoryButtonSkeleton = ({ count = 6 }) => (
  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        width={100}
        height={40}
        sx={{ borderRadius: 1 }}
      />
    ))}
  </Box>
);

/**
 * Ads slider skeleton
 */
export const AdsSliderSkeleton = () => (
  <Skeleton
    variant="rectangular"
    width="100%"
    height={300}
    sx={{ borderRadius: 2, mb: 2 }}
  />
);

/**
 * List item skeleton
 */
export const ListItemSkeleton = ({ count = 5 }) => (
  <Box>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ mb: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={60} />
      </Box>
    ))}
  </Box>
);

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  CategoryButtonSkeleton,
  AdsSliderSkeleton,
  ListItemSkeleton,
};
