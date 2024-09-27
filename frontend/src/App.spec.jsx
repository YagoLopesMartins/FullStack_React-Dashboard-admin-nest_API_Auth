import { render, screen } from '@testing-library/react'
import Test from './pages/Test'

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })

    it('should display elements', () => {
        render(<Test />)

        screen.debug()
    })
})
