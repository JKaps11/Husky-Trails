import { COLORS } from '@/constants/theme';
import React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';

interface OffCampusModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const MapModal: React.FC<OffCampusModalProps> = ({
  visible,
  message,
  onClose,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          margin: 32,
          padding: 20,
          borderRadius: 10,
          backgroundColor: COLORS.primary,
          zIndex: 2000,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginBottom: 12,
            color: COLORS.defaultText,
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
        <Button mode="outlined" onPress={onClose}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

export default MapModal;
