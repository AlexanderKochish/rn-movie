import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type AccordionSectionProps = {
  title: string
  icon?: keyof typeof Ionicons.glyphMap
  expanded: boolean
  onToggle: () => void
  children: ReactNode
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  iconColor?: string
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon,
  expanded,
  onToggle,
  children,
  containerStyle,
  titleStyle,
  iconColor = BaseColors.blueDark,
}) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.section,
        {
          borderColor: Colors[theme].border,
          backgroundColor: Colors[theme].stats,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={iconColor}
            style={styles.sectionIcon}
          />
        )}

        <Text
          style={[styles.titleText, { color: Colors[theme].text }, titleStyle]}
          numberOfLines={0}
        >
          {title}
        </Text>

        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={BaseColors.gray}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  sectionIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  titleText: {
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  chevron: {
    marginTop: 2,
  },
  content: {
    borderTopColor: '#666',
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
})
