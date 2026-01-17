# Petstore API Automation Framework

A scalable, maintainable API automation framework for the Petstore API (https://petstore.swagger.io/) built with TypeScript, Playwright Test, and Allure Report.

## 🏗️ Architecture

This framework follows the **Service Object Model** (POM adapted for API testing) with a well-organized, scalable structure:

```
petstore/
├── src/
│   ├── api/                          # API layer
│   │   ├── services/                 # Service classes
│   │   │   ├── base/                 # Base services
│   │   │   │   └── BaseService.ts
│   │   │   └── pet/                  # Pet-related services
│   │   │       └── PetService.ts
│   │   └── types/                    # TypeScript interfaces
│   │       ├── index.ts              # Barrel export
│   │       └── pet.types.ts          # Pet-related types
│   │
│   ├── config/                       # Configuration management
│   │   ├── index.ts                  # Main config
│   │   └── endpoints.ts              # API endpoints constants
│   │
│   ├── helpers/                      # Helper functions
│   │   ├── api.helper.ts             # API-related helpers
│   │   └── data.helper.ts            # Data manipulation helpers
│   │
│   ├── fixtures/                     # Test data & fixtures
│   │   ├── data/                     # Static test data
│   │   │   └── pet.data.ts
│   │   └── factories/                # Data factories
│   │       └── pet.factory.ts
│   │
│   │
│   └── tests/                        # Test suites
│       └── api/                      # API tests
│           └── pet/                  # Pet endpoint tests
│               └── pet.spec.ts
│
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

**Types** - TypeScript interfaces for type safety
- `pet.types.ts` - Pet-related interfaces
- `index.ts` - Barrel exports for easy imports

### Configuration (`src/config/`)
Centralized configuration management:
- `endpoints.ts` - API endpoint constants
- `index.ts` - Test configuration settings

### Helpers (`src/helpers/`)
Reusable utility functions:
- `api.helper.ts` - Response validation, error handling
- `data.helper.ts` - Data generation, manipulation

### Fixtures (`src/fixtures/`)
Test data management:
- `factories/pet.factory.ts` - Dynamic data generation
- `data/pet.data.ts` - Static test data and constants

### Tests (`src/tests/`)
Organized by API and feature:
- `api/pet/pet.spec.ts` - Pet API test suite
- `api/user/user.spec.ts` - User API test suite
- `api/store/store.spec.ts` - Store API test suite
- `api/security/security.spec.ts` - Security validation suite

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
- `@/helpers/*` → `src/helpers/*`
- `@/fixtures/*` → `src/fixtures/*`
- `@/tests/*` → `src/tests/*`

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

1. **Create Types** (`src/api/types/store.types.ts`):
```typescript
export interface Order {
  id: number;
  petId: number;
  quantity: number;
  status: string;
}
```

2. **Add Endpoints** (`src/config/endpoints.ts`):
```typescript
export const STORE_ENDPOINTS = {
  ORDER: 'store/order',
  ORDER_BY_ID: (id: number) => `store/order/${id}`
};
```

3. **Create Service** (`src/api/services/store/StoreService.ts`):
```typescript
import { BaseService } from '../base/BaseService';

export class StoreService extends BaseService {
  async placeOrder(order: Order): Promise<APIResponse> {
    return await this.request.post(STORE_ENDPOINTS.ORDER, { data: order });
  }
}
```

4. **Create Factory** (`src/fixtures/factories/store.factory.ts`):
```typescript
export function createOrderData(overrides = {}) {
  return { id: Date.now(), petId: 1, quantity: 1, ...overrides };
}
```

5. **Write Tests** (`src/tests/api/store/order.spec.ts`):
```typescript
import { StoreService } from '@/api/services/store/StoreService';

test('Create order', async ({ request }) => {
  const service = new StoreService(request);
  // ... test logic
});
```

## 📌 Important Notes

- **Base URL**: Must end with trailing slash (`/v2/`) for proper path concatenation
- **Endpoint Paths**: Should be relative without leading slash (e.g., `'pet'` not `'/pet'`)
- **Test Data**: Use factory functions to generate unique data
- **Cleanup**: Tests should clean up created resources

## 📄 License

ISC

---

**Built with ❤️ by Senior QA Engineer**
