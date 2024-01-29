import {
  Box,
  Grid,
  GridProps,
  Indicator,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Thresholds } from "../types";

interface IWebsiteCardProps extends GridProps {
  websiteLatencyMs?: number;
  isAddCard?: boolean;
  thresholds?: Thresholds;
}

const useStyles = createStyles(
  ({ radius, spacing }, { indicatorColor }: { indicatorColor: string }) => ({
    colContentWrapper: {
      border: "1px solid black",
      borderRadius: radius.md,
      padding: spacing.xs,
      height: "100%",
      cursor: "pointer",
    },
    indicator: {
      height: "100%",
      ".mantine-Indicator-indicator": {
        backgroundColor: indicatorColor,
      },
    },
  })
);

export const WebsiteCard = ({
  onClick,
  websiteLatencyMs,
  isAddCard,
  thresholds,
  children,
}: IWebsiteCardProps) => {
  const { colors } = useMantineTheme();

  const indicatorColor = (() => {
    const { gray, green, red, orange } = colors;
    if (!thresholds || !websiteLatencyMs) {
      return gray[9];
    }
    const isLow = websiteLatencyMs < thresholds.low[0];
    const isMedium =
      websiteLatencyMs > thresholds.medium[0] &&
      websiteLatencyMs < thresholds.medium[1];

    return (isLow ? green[9] : isMedium ? orange[9] : red[9]) as string;
  })();

  const { classes } = useStyles({
    indicatorColor,
  });
  return (
    <Grid.Col span={4} onClick={onClick}>
      {isAddCard ? (
        <Box className={classes.colContentWrapper}>{children}</Box>
      ) : (
        <Indicator className={classes.indicator} size={"18px"}>
          <Box className={classes.colContentWrapper}>{children}</Box>
        </Indicator>
      )}
    </Grid.Col>
  );
};
