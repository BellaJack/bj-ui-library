import { Injectable } from '@angular/core';
import { UiSize, UiIconColor, UiBjType, UiRadius } from '@twentyninelab/bj-ui-library/models/ui';

@Injectable({
  providedIn: 'root'
})

export class UICommonService {

  constructor() { }

  getSizeAbbreviation(size: UiSize): string {
    switch (size) {
      case 'extra-small':
      case 'xs':
        return 'xs';
      case 'small':
      case 'sm':
        return 'sm';
      case 'medium':
      case 'md':
        return 'md';
      case 'large':
      case 'lg':
        return 'lg';
      case 'extra-large':
      case 'xl':
        return 'xl';
      default:
        return '';
    }
  }

  getRadiusClass(size: UiRadius): string {
    switch (size) {
      case 'small':
        return 'bj-radius-xxs';
      case 'medium':
        return 'bj-radius';
      case 'large':
        return 'bj-radius-sm';
      case 'pills':
        return 'bj-radius-round';
      case 'all':
        return 'bj-radius-round';
      case 'none':
        return 'bj-radius-none';
      default:
        return '';
    }
  }

  getBackgroundClassByType(type: UiBjType|UiIconColor): string {
    switch (type) {
      case 'success':
        return 'bj-bg-status-success';
      case 'warning':
        return 'bj-bg-status-warning';
      case 'error':
        return 'bj-bg-status-error';
      case 'alarm':
        return 'bj-bg-status-alarm';
      case 'gray-dark':
        return 'bj-bg-gray-800';
      default:
        return 'bj-bg-gray-600';
    }
  }

  getBackgroundLightClassByType(type: UiBjType|UiIconColor): string {
    switch (type) {
      case 'success':
        return 'bj-bg-status-success-light';
      case 'warning':
        return 'bj-bg-status-warning-light';
      case 'error':
        return 'bj-bg-status-error-light';
      default:
        return 'bj-bg-gray-200';
    }
  }

  getIconClassByType(type: UiBjType): string {
    switch (type) {
      default:
        return 'fas fa-triangle-exclamation';
    }
  }
}
