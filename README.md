# Playwright Portfolio: API Automation With Petstore

A scalable, maintainable API automation framework for the Petstore API (https://petstore.swagger.io/) built with TypeScript, Playwright Test, and Allure Report.

## 🏗️ Architecture

This framework follows the **Service Object Model** (POM adapted for API testing) with a well-organized, scalable structure:

```
petstore/
├── src/
│   ├── api/                          # API layer
│   │   ├── services/                 # Service classes
│   │   │   ├── base/
│   │   │   │   └── BaseService.ts    # Foundation class for all services
│   │   │   ├── pet/
│   │   │   │   └── PetService.ts     # Pet CRUD operations
│   │   │   ├── store/
│   │   │   │   └── StoreService.ts   # Store/Order operations
│   │   │   └── user/
│   │   │       └── UserService.ts    # User management operations
│   │   └── types/                    # TypeScript interfaces
│   │       ├── index.ts              # Barrel export
│   │       ├── pet.types.ts          # Pet-related types
│   │       ├── store.types.ts        # Store/Order types
│   │       └── user.types.ts         # User types
│   │
│   ├── config/                       # Configuration management
│   │   ├── index.ts                  # Main config
│   │   └── endpoints.ts              # API endpoints constants
│   │
│   ├── constants/                    # Application constants
│   │   ├── index.ts                  # Barrel export
│   │   ├── httpStatus.ts             # HTTP status codes
│   │   └── messages.ts               # Response messages
│   │
│   ├── helpers/                      # Helper functions
│   │   └── api.helper.ts             # API-related helpers
│   │
│   ├── utils/                        # Utility functions
│   │   ├── index.ts                  # Barrel export
│   │   └── common.utils.ts           # Common utilities
│   │
│   └── fixtures/                     # Test data & fixtures
│       ├── data/                     # Static test data
│       │   ├── pet.data.ts
│       │   ├── order.data.ts
│       │   └── user.data.ts
│       └── factories/                # Data factories
│           ├── pet.factory.ts
│           ├── order.factory.ts
│           └── user.factory.ts
│
├── tests/                            # Test suites
│   └── api/                          # API tests
│       ├── pet/
│       │   └── pet.spec.ts           # Pet API tests
│       ├── store/
│       │   └── store.spec.ts         # Store API tests
│       ├── user/
│       │   └── user.spec.ts          # User API tests
│       └── security/
│           └── security.spec.ts      # Security validation tests
│
├── .github/workflows/                # GitHub Actions CI/CD
│   └── playwright.yml
├── .gitlab-ci.yml                    # GitLab CI/CD
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript config with path aliases
└── package.json                      # Dependencies and scripts
```

## 🚀 Tech Stack

- **TypeScript**: Strict typing and modern JavaScript features
- **Playwright Test**: Native API testing framework
- **Allure Report**: Comprehensive test reporting
- **Node.js**: Runtime environment

## 📦 Installation

```bash
npm install
```

This will install:
- `@playwright/test` - API testing framework
- `typescript` - TypeScript compiler
- `allure-playwright` - Allure reporter integration
- `allure-commandline` - Allure report generator

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run with specific worker count
```bash
npm test -- --workers=1
```

### Run specific test file
```bash
npx playwright test tests/api/pet/pet.spec.ts
```

### Run security tests
```bash
npx playwright test --grep @security
```

## 📊 Generating Reports

### Generate Allure Report
```bash
npm run report:generate
```

### View Allure Report
```bash
npm run report:open
```

## 📂 Project Structure Explained

### API Layer (`src/api/`)
**Services** - Encapsulates all API operations
- `BaseService.ts` - Foundation class for all services
- `PetService.ts` - Pet CRUD operations
- `StoreService.ts` - Store/Order operations
- `UserService.ts` - User management operations

**Types** - TypeScript interfaces for type safety
- `pet.types.ts` - Pet-related interfaces
- `store.types.ts` - Store/Order interfaces
- `user.types.ts` - User interfaces
- `index.ts` - Barrel exports for easy imports

### Configuration (`src/config/`)
Centralized configuration management:
- `endpoints.ts` - API endpoint constants
- `index.ts` - Test configuration settings

### Constants (`src/constants/`)
Application-wide constants:
- `httpStatus.ts` - HTTP status code constants
- `messages.ts` - Response message constants

### Helpers (`src/helpers/`)
Reusable utility functions:
- `api.helper.ts` - Response validation, error handling

### Utils (`src/utils/`)
Common utility functions:
- `common.utils.ts` - General purpose utilities

### Fixtures (`src/fixtures/`)
Test data management:
- `factories/*.factory.ts` - Dynamic data generation (pet, order, user)
- `data/*.data.ts` - Static test data and constants

### Tests (`tests/api/`)
Organized by API and feature:
- `pet/pet.spec.ts` - Pet API test suite
- `store/store.spec.ts` - Store API test suite
- `user/user.spec.ts` - User API test suite
- `security/security.spec.ts` - Security validation suite

## 🎯 Import Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of: import { Pet } from '../../../api/types'
import { Pet } from '@/api/types'

// Instead of: import { PetService } from '../../../api/services/pet/PetService'
import { PetService } from '@/api/services/pet/PetService'
```

**Available Aliases:**
- `@/api/*` → `src/api/*`
- `@/config/*` → `src/config/*`
- `@/constants/*` → `src/constants/*`
- `@/helpers/*` → `src/helpers/*`
- `@/utils/*` → `src/utils/*`
- `@/fixtures/*` → `src/fixtures/*`

## 🔍 Test Scenarios

### 1. Complete CRUD Lifecycle ✅
- Create a new pet
- Retrieve the created pet
- Update pet details
- Delete the pet
- Verify deletion (404)

### 2. Bulk Operations ✅
- Create multiple pets
- Verify each creation
- Cleanup all created pets

### 3. Status Updates ✅
- Update pet status: available → pending → sold
- Verify each status change

### 4. Error Handling ✅
- Verify 404 for non-existent pet

### 5. User Management ✅
- Complete authentication flow (Login/logout)
- User lifecycle (Create, Update, Delete)
- Bulk user creation (Array/List)

### 6. Security Validation 🔒
- **XSS Injection** - Prevent script execution in input fields
- **SQL Injection** - Verify resilience against SQLi in parameters
- **DoS Prevention** - Large payload handling checks

## 🚀 CI/CD Integration

This project supports both **GitHub Actions** and **GitLab CI/CD**.

### GitHub Actions
Workflow is defined in `.github/workflows/playwright.yml`:
- **Trigger**: Manual only (workflow_dispatch)
- **Runner**: Ubuntu latest with Node.js LTS
- **Steps**: Install dependencies → Run Playwright tests → Upload report
- **Artifacts**: Playwright report stored for 30 days

To run manually:
1. Go to **Actions** tab
2. Select **Playwright Tests**
3. Click **Run workflow**

### GitLab CI/CD
Pipeline is defined in `.gitlab-ci.yml`:
1. **Test**: Runs the full regression suite using official Playwright Docker image
2. **Report**: Generates Allure Report and publishes to GitLab Pages

## 💡 Best Practices Implemented

1. **Separation of Concerns** - Clear separation between services, types, helpers, and tests
2. **Type Safety** - Comprehensive TypeScript interfaces
3. **DRY Principle** - Reusable factories and helpers
4. **Test Independence** - Each test manages its own data
5. **Scalability** - Easy to add new endpoints and services
6. **Configuration Management** - Centralized configuration
7. **Path Aliases** - Clean, readable imports

## 🔧 Extending the Framework

### Adding a New Endpoint

1. **Create Types** (`src/api/types/newEntity.types.ts`):
```typescript
export interface NewEntity {
  id: number;
  name: string;
  // ... other fields
}
```

2. **Add Endpoints** (`src/config/endpoints.ts`):
```typescript
export const NEW_ENTITY_ENDPOINTS = {
  BASE: 'newEntity',
  BY_ID: (id: number) => `newEntity/${id}`
};
```

3. **Create Service** (`src/api/services/newEntity/NewEntityService.ts`):
```typescript
import { BaseService } from '../base/BaseService';

export class NewEntityService extends BaseService {
  async create(data: NewEntity): Promise<APIResponse> {
    return await this.request.post(NEW_ENTITY_ENDPOINTS.BASE, { data });
  }
}
```

4. **Create Factory** (`src/fixtures/factories/newEntity.factory.ts`):
```typescript
export function createNewEntityData(overrides = {}) {
  return { id: Date.now(), name: 'Test Entity', ...overrides };
}
```

5. **Write Tests** (`tests/api/newEntity/newEntity.spec.ts`):
```typescript
import { NewEntityService } from '@/api/services/newEntity/NewEntityService';

test('Create entity', async ({ request }) => {
  const service = new NewEntityService(request);
  // ... test logic
});
```

## 📌 Important Notes

- **Base URL**: Must end with trailing slash (`/v2/`) for proper path concatenation
- **Endpoint Paths**: Should be relative without leading slash (e.g., `'pet'` not `'/pet'`)
- **Test Data**: Use factory functions to generate unique data
- **Cleanup**: Tests should clean up created resources
